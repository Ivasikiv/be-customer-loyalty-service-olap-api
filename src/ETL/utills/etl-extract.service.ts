import { GraphQLClient } from 'graphql-request';
import * as interfaces from './interfaces';
import * as queries from './queries';
import { Prisma } from '@prisma/client';
import { isDataView } from 'util/types';

export class ETLProcessService {
  private client: GraphQLClient;
  private loadClient: GraphQLClient;
  private orders: any[] = [];
  private orderDetails: any[] = [];
  private dimAssortment: any[] = [];
  private dimPromoCampaigns: any[] = [];
  private dimLoyaltyCards: any[] = [];
  private loyaltyCardTypes: any[] = [];
  private dimLoyaltyUsers: any[] = [];
  private partners: any[] = [];
  private dimPartnerLocations: any[] = [];
  private dimSellers: any[] = [];
  private dimPointTransactions: any[] = [];
  private dimDate: any[] = [];
  private dimTime: any[] = [];
  private factTransactionItems: any[] = [];
  private factTransactionChecks: any[] = [];

  constructor() {
    this.client = new GraphQLClient('http://localhost:3000/graphql');
    this.loadClient = new GraphQLClient('http://localhost:3002/graphql');
  }

  async fetchOrderRecords(startDate?: string, endDate?: string): Promise<any> {
    this.clearAllArrays();

    let query;
    const variables = {
      startDate,
      endDate,
    };

    try {
      if (startDate && endDate) {
        query = queries.ORDER_RECORDS_DATE_RANGE_QUERY;
        const response =
          await this.client.request<interfaces.OrderRecordsResponse>(
            query,
            variables,
          );
        this.orders = response.getOrderRecordsFromDateRange;
      } else {
        query = queries.ORDER_RECORDS_QUERY;
        const response =
          await this.client.request<interfaces.AllOrderRecordsResponse>(
            query,
            variables,
          );
        this.orders = response.orderRecords;
      }

      if (this.orders.length > 0) {
        for (const order of this.orders) {
          await this.fetchOrderDetails(order.OrderID);
          await this.fetchLoyaltyCardAndUser(
            order.LoyaltyCardID,
            order.OrderDateTime,
          );
          await this.fetchPartnerLocation(order.LocationID);
          await this.fetchEmployeeById(order.SellerID);
          await this.fetchPointTransactionByOrderID(order.OrderID);
          this.processDateTime(order.OrderDateTime, order.OrderID);
        }
        for (const orderDetail of this.orderDetails) {
          await this.fetchAssortmentById(orderDetail.AssortmentSegmentID);
          if (orderDetail.PromoCampaignID) {
            await this.fetchPromoCampaignById(orderDetail.PromoCampaignID);
          }
        }
      }

      //save data to OLAP
      console.log('Orders:', this.orders.length);
      console.log('Card:', this.dimLoyaltyCards.length);
      console.log('Users:', this.dimLoyaltyUsers.length);
      console.log('Locations:', this.dimPartnerLocations.length);
      console.log('partnes:', this.partners.length);
      console.log('Employees:', this.dimSellers.length);
      console.log('Date:', this.dimDate.length);
      console.log('Time:', this.dimTime.length);
      console.log('-----------------------------------');
      //   console.log('Orders: ', this.orders);
      //   console.log('Card: ', this.loyaltyCards);
      //   console.log('Users: ', this.loyaltyUsers);
      //   console.log('Locations: ', this.partnerLocations);
      //   console.log('Partners: ', this.partners);
      //   console.log(this.orders);
      console.log('-----------------------------------');
      // console.log(this.dimPartnerLocations);
      // console.log(this.dimEmployees);
      // console.log(this.dimLoyaltyCards);
      // console.log(this.dimLoyaltyUsers);
      //console.log(this.dimAssortment);
      // console.log(this.dimPromoCampaigns);
      // console.log(this.dimDate);
      // console.log(this.dimTime);

      // console.log(this.dimPartnerLocations[0]);
      // console.log(this.dimEmployees[0]);
      // console.log(this.dimLoyaltyCards[0]);
      // console.log(this.dimLoyaltyUsers[0]);
      // console.log(this.dimAssortment[0]);
      // console.log(this.dimPromoCampaigns[0]);
      // console.log(this.dimDate[0]);
      // console.log(this.dimTime[0]);

      // console.log(this.orders);
      // console.log(this.orderDetails);
      // console.log(this.dimPointTransactions);

      await this.transformOrders();
      await this.transformOrderDetails();
      await this.loadData();

      // console.log(this.factTransactionChecks[0]);
      // console.log(this.factTransactionItems[0]);

      // console.log(this.dimTime);
    } catch (error) {
      console.error('GraphQL request failed:', error.message);
      throw error;
    }
  }

  clearAllArrays(): void {
    this.orders = [];
    this.orderDetails = [];
    this.dimAssortment = [];
    this.dimPromoCampaigns = [];
    this.dimLoyaltyCards = [];
    this.loyaltyCardTypes = [];
    this.dimLoyaltyUsers = [];
    this.partners = [];
    this.dimPartnerLocations = [];
    this.dimSellers = [];
    this.dimPointTransactions = [];
    this.dimDate = [];
    this.dimTime = [];
    this.factTransactionItems = [];
    this.factTransactionChecks = [];
  }

  async fetchOrderDetails(orderId: number): Promise<void> {
    const query = queries.ORDER_DETAILS_BY_ORDER_ID_QUERY;
    const variables = { orderId };

    try {
      const orderDetails =
        await this.client.request<interfaces.OrderDetailsByOrderIDResponse>(
          query,
          variables,
        );
      this.orderDetails.push(...orderDetails.orderDetailsByOrderID);
    } catch (error) {
      console.error('Failed to fetch order details:', error.message);
      throw error;
    }
  }

  async fetchAssortmentById(
    assortmentSegmentId: number,
  ): Promise<interfaces.AssortmentSegmentResponse | null> {
    const query = queries.ASSORTMENT_SEGMENT_QUERY;
    const variables = { assortmentSegmentId };

    if (
      this.dimAssortment.some(
        (item) => item.AssortmentSegmentID === assortmentSegmentId,
      )
    ) {
      return;
    }

    try {
      const response =
        await this.client.request<interfaces.AssortmentSegmentResponse>(
          query,
          variables,
        );
      const dimAssortmentSegment = {
        AssortmentSegmentID: response.assortmentSegment.AssortmentSegmentID,
        AssortmentSegmentType: response.assortmentSegment.AssortmentSegmentType,
        Points: response.assortmentSegment.Points,
      };
      this.dimAssortment.push(dimAssortmentSegment);
    } catch (error) {
      console.error('Failed to fetch assortment by ID:', error.message);
      return null;
    }
  }

  async fetchPromoCampaignById(
    promoCampaignId: number,
  ): Promise<interfaces.PromoCampaignResponse | null> {
    const query = queries.PROMO_CAMPAIGN_QUERY;
    const variables = { promoCampaignId };

    if (
      this.dimPromoCampaigns.some(
        (item) => item.PromoCampaignID === promoCampaignId,
      )
    ) {
      return;
    }

    try {
      const response =
        await this.client.request<interfaces.PromoCampaignResponse>(
          query,
          variables,
        );
      const dimPromoCampaign = {
        PromoCampaignID: response.promoCampaign.PromoCampaignID,
        PromoCampaignName: response.promoCampaign.PromoCampaignName,
        Description: response.promoCampaign.Description,
        StartDate: response.promoCampaign.StartDate,
        EndDate: response.promoCampaign.EndDate,
      };
      this.dimPromoCampaigns.push(dimPromoCampaign);
    } catch (error) {
      console.error('Failed to fetch promo campaign by ID:', error.message);
      return null;
    }
  }

  async fetchLoyaltyCardAndUser(
    loyaltyCardId: number,
    OrderDateTime: Date,
  ): Promise<void> {
    const cardQuery = queries.LOYALTY_CARD_QUERY;
    const cardTypeQuery = queries.LOYALTY_CARD_TYPE_QUERY;
    const userQuery = queries.LOYALTY_USER_QUERY;
    const cardVariables = { loyaltyCardId };

    if (
      this.dimLoyaltyCards.some((item) => item.LoyaltyCardID === loyaltyCardId)
    ) {
      return;
    }

    try {
      const cardResponse =
        await this.client.request<interfaces.LoyaltyCardResponse>(
          cardQuery,
          cardVariables,
        );

      let cardTypeResponse: interfaces.LoyaltyCardTypeResponse;
      let cardType;
      let discountPercentage;
      const existingCardType = this.loyaltyCardTypes.find(
        (card) =>
          card.LoyaltyCardTypeID === cardResponse.loyaltyCard.LoyaltyCardTypeID,
      );
      if (existingCardType) {
        cardTypeResponse = existingCardType;
        cardType = existingCardType.TypeName;
        discountPercentage = existingCardType.DiscountPercentage;
      } else {
        cardTypeResponse =
          await this.client.request<interfaces.LoyaltyCardTypeResponse>(
            cardTypeQuery,
            { loyaltyCardTypeId: cardResponse.loyaltyCard.LoyaltyCardTypeID },
          );
        this.loyaltyCardTypes.push(cardTypeResponse.loyaltyCardType);
        cardType = cardTypeResponse.loyaltyCardType.TypeName;
        discountPercentage =
          cardTypeResponse.loyaltyCardType.DiscountPercentage;
      }

      const loyaltyCard: interfaces.LoyaltyCardForDimention = {
        LoyaltyCardID: cardResponse.loyaltyCard.LoyaltyCardID,
        CardType: cardType,
        DiscountPercentage: discountPercentage,
        CardNumber: cardResponse.loyaltyCard.CardNumber,
        CardBalance: cardResponse.loyaltyCard.CurrentBalance,
      };
      this.dimLoyaltyCards.push(loyaltyCard);

      if (
        this.dimLoyaltyUsers.some(
          (user) =>
            user.LoyaltyUserID === cardResponse.loyaltyCard.LoyaltyUserID,
        )
      ) {
        return;
      }
      const userResponse =
        await this.client.request<interfaces.LoyaltyUserResponse>(userQuery, {
          loyaltyUserId: cardResponse.loyaltyCard.LoyaltyUserID,
        });
      const dimUser = {
        LoyaltyUserID: userResponse.LoyaltyUser.LoyaltyUserID,
        FirstName: userResponse.LoyaltyUser.FirstName,
        LastName: userResponse.LoyaltyUser.LastName,
        Age:
          new Date(OrderDateTime).getFullYear() -
          new Date(userResponse.LoyaltyUser.BirthDate).getFullYear(),
      };
      this.dimLoyaltyUsers.push(dimUser);
    } catch (error) {
      console.error('Failed to fetch loyalty card and user:', error.message);
      throw error;
    }
  }

  async fetchPartnerLocation(partnerLocationId: number): Promise<void> {
    const partnerQuery = queries.PARTNER_QUERY;
    const locationQuery = queries.PARTNER_LOCATION_QUERY;
    const locationVariables = { partnerLocationId };

    if (
      this.dimPartnerLocations.some(
        (location) => location.LocationID === partnerLocationId,
      )
    ) {
      return;
    }

    try {
      const locationResponse =
        await this.client.request<interfaces.PartnerLocationRespons>(
          locationQuery,
          locationVariables,
        );

      let partnerResponse: interfaces.PartnerResponse;
      const existingPartner = this.partners.find(
        (partner) =>
          partner.PartnerID === locationResponse.partnerLocation.PartnerID,
      );

      const partnerId = locationResponse.partnerLocation.PartnerID;
      let partnerName;

      if (existingPartner) {
        partnerResponse = existingPartner;
        partnerName = existingPartner.Name;
      } else {
        partnerResponse = await this.client.request<interfaces.PartnerResponse>(
          partnerQuery,
          { partnerId },
        );
        this.partners.push(partnerResponse.partner);
        partnerName = partnerResponse.partner.Name;
      }

      const partnerLocation: interfaces.DimPartnerLocation = {
        LocationID: locationResponse.partnerLocation.LocationID,
        PartnerName: partnerName,
        LocationName: locationResponse.partnerLocation.LocationName,
        Address: locationResponse.partnerLocation.Address,
        City: locationResponse.partnerLocation.City,
        State: locationResponse.partnerLocation.State,
        ZipCode: locationResponse.partnerLocation.ZipCode,
        Country: locationResponse.partnerLocation.Country,
      };

      this.dimPartnerLocations.push(partnerLocation);
    } catch (error) {
      console.error('Failed to fetch partner location:', error.message);
      throw error;
    }
  }

  async fetchEmployeeById(employeeId: number): Promise<void> {
    const query = queries.EMPLOYEE_QUERY;
    const variables = { employeeId };

    if (
      this.dimSellers.some((employee) => employee.EmployeeID === employeeId)
    ) {
      return;
    }

    try {
      const response = await this.client.request<interfaces.EmployeeResponse>(
        query,
        variables,
      );
      const dimSeller = {
        SellerID: response.employee.EmployeeID,
        FirstName: response.employee.FirstName,
        LastName: response.employee.LastName,
      };
      this.dimSellers.push(dimSeller);
    } catch (error) {
      console.error('Failed to fetch employee by ID:', error.message);
      throw error;
    }
  }

  async fetchPointTransactionByOrderID(orderId: number): Promise<void> {
    const query = queries.POINT_TRANSACTION_QUERY;
    const variables = { orderId };

    try {
      const response =
        await this.client.request<interfaces.PointTransactionByOrderIDResponse>(
          query,
          variables,
        );

      this.dimPointTransactions.push(...response.pointTransactionByOrderID);
    } catch (error) {
      console.error(
        'Failed to fetch point transaction by OrderID:',
        error.message,
      );
      return null;
    }
  }

  processDateTime(dateTimeString: string, id: number): void {
    const dateTime = new Date(dateTimeString);

    // Process Date
    const year = dateTime.getFullYear();
    const calendarQuarter = this.getCalendarQuarter(dateTime);
    const calendarMonth = dateTime.getMonth() + 1;
    const weekNumber = this.getWeekNumber(dateTime);
    const dayOfWeek = dateTime.getDay() === 0 ? 7 : dateTime.getDay(); // Adjust day of week to be from 1 to 7

    const dateData = {
      DateID: id,
      FullDate: dateTime.toISOString().substring(0, 10), // Format YYYY-MM-DD
      DayOfWeek: dayOfWeek,
      WeekNumber: weekNumber,
      CalendarMonth: calendarMonth,
      CalendarQuarter: calendarQuarter,
      CalendarYear: year,
    };

    this.dimDate.push(dateData);

    // Process Time
    const hourOfDay = dateTime.getHours();
    const minuteOfHour = dateTime.getMinutes();
    const amOrPm = hourOfDay < 12 ? 0 : 1; // Determine AM (0) or PM (1)

    const timeData = {
      TimeID: id,
      FullTime: `${hourOfDay.toString().padStart(2, '0')}:${minuteOfHour.toString().padStart(2, '0')}`, // Format HH:MM
      HourOfDay: hourOfDay,
      MinuteOfHour: minuteOfHour,
      AMorPM: amOrPm,
    };

    this.dimTime.push(timeData);
  }

  private getWeekNumber(dateTime: Date): number {
    const dateCopy = new Date(dateTime.getTime());
    dateCopy.setHours(0, 0, 0, 0);
    dateCopy.setDate(dateCopy.getDate() + 3 - ((dateCopy.getDay() + 6) % 7));
    const week1 = new Date(dateCopy.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((dateCopy.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  }

  private getCalendarQuarter(dateTime: Date): number {
    return Math.floor(dateTime.getMonth() / 3) + 1;
  }

  private transformOrderDetails(): void {
    this.orderDetails.forEach((orderDetail) => {
      const {
        OrderDetailID,
        OrderID,
        AssortmentSegmentID,
        PromoCampaignID,
        Quantity,
        Price,
        ItemName,
      } = orderDetail;

      // Find corresponding order
      const correspondingOrder = this.orders.find(
        (order) => order.OrderID === OrderID,
      );

      // Find corresponding assortment
      const correspondingAssortment = this.dimAssortment.find(
        (assortment) => assortment.AssortmentSegmentID === AssortmentSegmentID,
      );

      if (correspondingOrder && correspondingAssortment) {
        const { SellerID, LoyaltyCardID, LocationID } = correspondingOrder;

        const TotalPoints = correspondingAssortment.Points * Quantity;

        const transactionItem: interfaces.FactTransactionItem = {
          TransactionItemID: OrderDetailID,
          DateID: OrderID,
          TimeID: OrderID,
          AssortmentSegmentID,
          PromoCampaignID: PromoCampaignID || null, // Default PromoCampaignID to 0 if null
          SellerID,
          LoyaltyUserID: LoyaltyCardID,
          LocationID,
          ItemName,
          QuantitySold: Quantity,
          Price,
          TotalPoints,
        };

        // Push the transformed transaction item to your data array
        this.factTransactionItems.push(transactionItem);
        //console.log('Transaction Item:', transactionItem);
      } else {
      }
    });
  }

  private transformOrders(): void {
    this.orders.forEach((order) => {
      const {
        LocationID,
        LoyaltyCardID,
        OrderDateTime,
        OrderID,
        SellerID,
        PaymentMethod,
      } = order;

      // Calculate TimeFromLastCardUsage
      const latestOrderWithSameLoyaltyUserID = this.orders
        .filter(
          (o) => o.LoyaltyCardID === LoyaltyCardID && o.OrderID !== OrderID,
        )
        .reduce(
          (latest, o) =>
            new Date(o.OrderDateTime) > new Date(latest.OrderDateTime)
              ? o
              : latest,
          order,
        );

      const timeFromLastCardUsage: number =
        latestOrderWithSameLoyaltyUserID &&
        Math.abs(
          Math.round(
            (new Date(OrderDateTime).getTime() -
              new Date(
                latestOrderWithSameLoyaltyUserID.OrderDateTime,
              ).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        );

      // Calculate TotalPrice from related factTransactionItems
      const totalPrice = this.factTransactionItems
        .filter((item) => item.DateID === OrderID)
        .reduce((sum, item) => sum + item.Price, 0);

      // Calculate PointsAccumulated and PointsWithdraw from dimPointTransactions
      const pointTransactionsForOrder = this.dimPointTransactions.filter(
        (pt) => pt.OrderRecordID === OrderID,
      );
      let pointsAccumulated = 0;
      let pointsWithdraw = 0;

      pointTransactionsForOrder.forEach((pt) => {
        if (pt.PointTransactionType === 'Accrual') {
          pointsAccumulated += pt.PointsChange;
        } else if (pt.PointTransactionType === 'Withdrawn') {
          pointsWithdraw += pt.PointsChange;
        }
      });

      const transactionCheck: interfaces.FactTransactionCheck = {
        TransactionCheckID: OrderID,
        DateID: OrderID,
        TimeID: OrderID,
        LoyaltyCardID,
        SellerID,
        LoyaltyUserID: LoyaltyCardID,
        LocationID,
        PaymentMethod,
        TimeFromLastCardUsage: timeFromLastCardUsage || 0, // Default to 0 if no previous order found
        PointsAccumulated: pointsAccumulated,
        PointsWithdraw: pointsWithdraw,
        TotalPrice: totalPrice,
      };

      // Push the transformed transaction check to your data array
      this.factTransactionChecks.push(transactionCheck);
      //console.log('Transaction Check:', transactionCheck);
    });
  }

  async loadData(): Promise<void> {
    console.log('Loading data to OLAP...');
    try {
      for (const assortment of this.dimAssortment) {
        await this.loadClient.request(queries.LOAD_ASSORTMENT_SEGMENT_QUERY, {
          createData: assortment,
        });
      }
      console.log('Assortment loaded successfully!');

      for (const promoCampaign of this.dimPromoCampaigns) {
        await this.loadClient.request(queries.LOAD_PROMO_CAMPAIGN_QUERY, {
          createData: promoCampaign,
        });
      }
      console.log('Promo Campaigns loaded successfully!');

      for (const card of this.dimLoyaltyCards) {
        await this.loadClient.request(queries.LOAD_LOYALTY_CARD_QUERY, {
          createData: card,
        });
      }
      console.log('Loyalty Cards loaded successfully!');

      for (const user of this.dimLoyaltyUsers) {
        await this.loadClient.request(queries.LOAD_LOYALTY_USER_QUERY, {
          createData: user,
        });
      }
      console.log('Loyalty Users loaded successfully!');

      for (const location of this.dimPartnerLocations) {
        await this.loadClient.request(queries.LOAD_LOCATION_QUERY, {
          createData: location,
        });
      }
      console.log('Partner Locations loaded successfully!');

      for (const seller of this.dimSellers) {
        await this.loadClient.request(queries.LOAD_SELLER_QUERY, {
          createData: seller,
        });
      }
      console.log('Sellers loaded successfully!');

      for (const date of this.dimDate) {
        await this.loadClient.request(queries.LOAD_DIM_DATE_QUERY, {
          createData: date,
        });
      }
      console.log('Dates loaded successfully!');

      for (const time of this.dimTime) {
        await this.loadClient.request(queries.LOAD_DIM_TIME_QUERY, {
          createData: time,
        });
      }
      console.log('Times loaded successfully!');

      for (const orderRecord of this.factTransactionChecks) {
        await this.loadClient.request(queries.LOAD_ORDER_RECORD_QUERY, {
          data: orderRecord,
        });
      }
      console.log('Transaction Checks loaded successfully!');

      for (const orderDetail of this.factTransactionItems) {
        await this.loadClient.request(queries.LOAD_ORDER_DETAIL_QUERY, {
          data: orderDetail,
        });
      }
      console.log('Transaction Items loaded successfully!');
    } catch (error) {
      console.error('Failed to load data to OLAP:', error.message);
      throw error;
    }
  }
}
