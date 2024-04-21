import { GraphQLClient } from 'graphql-request';
import * as interfaces from './interfaces';
import * as queries from './queries';

export class ETLProcess {
  private client: GraphQLClient;
  private orders: any[] = [];
  private orderDetails: any[] = [];
  private assortment: any[] = [];
  private promoCampaigns: any[] = [];
  private loyaltyCards: any[] = [];
  private loyaltyCardTypes: any[] = [];
  private loyaltyUsers: any[] = [];
  private partners: any[] = [];
  private partnerLocations: any[] = [];
  private employees: any[] = [];
  private dimDate: any[] = [];
  private dimTime: any[] = [];

  constructor() {
    this.client = new GraphQLClient('http://localhost:3000/graphql');
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
          await this.fetchLoyaltyCardAndUser(order.LoyaltyCardID);
          await this.fetchPartnerLocation(order.LocationID);
          await this.fetchEmployeeById(order.SellerID);
          this.processDateTime(order.OrderDateTime);
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
      console.log('Card:', this.loyaltyCards.length);
      console.log('Users:', this.loyaltyUsers.length);
      console.log('Locations:', this.partnerLocations.length);
      console.log('partnes:', this.partners.length);
      console.log('Employees:', this.employees.length);
      console.log('Date:', this.dimDate.length);
      console.log('Time:', this.dimTime.length);
      console.log('-----------------------------------');
      //   console.log('Orders: ', this.orders);
      //   console.log('Card: ', this.loyaltyCards);
      //   console.log('Users: ', this.loyaltyUsers);
      //   console.log('Locations: ', this.partnerLocations);
      //   console.log('Partners: ', this.partners);
      //   console.log(this.orders);
      // console.log(this.dimDate);
      // console.log(this.dimTime);
    } catch (error) {
      console.error('GraphQL request failed:', error.message);
      throw error;
    }
  }

  clearAllArrays(): void {
    this.orders = [];
    this.orderDetails = [];
    this.assortment = [];
    this.promoCampaigns = [];
    this.loyaltyCards = [];
    this.loyaltyCardTypes = [];
    this.loyaltyUsers = [];
    this.partners = [];
    this.partnerLocations = [];
    this.employees = [];
    this.dimDate = [];
    this.dimTime = [];
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
      this.assortment.some(
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
      this.assortment.push(response.assortmentSegment);
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
      this.promoCampaigns.some(
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
      this.promoCampaigns.push(response.promoCampaign);
    } catch (error) {
      console.error('Failed to fetch promo campaign by ID:', error.message);
      return null;
    }
  }

  async fetchLoyaltyCardAndUser(loyaltyCardId: number): Promise<void> {
    const cardQuery = queries.LOYALTY_CARD_QUERY;
    const cardTypeQuery = queries.LOYALTY_CARD_TYPE_QUERY;
    const userQuery = queries.LOYALTY_USER_QUERY;
    const cardVariables = { loyaltyCardId };

    if (
      this.loyaltyCards.some((item) => item.LoyaltyCardID === loyaltyCardId)
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
        CurrentBalance: cardResponse.loyaltyCard.CurrentBalance,
      };
      this.loyaltyCards.push(loyaltyCard);

      if (
        this.loyaltyUsers.some(
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

      this.loyaltyUsers.push(userResponse.LoyaltyUser);
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
      this.partnerLocations.some(
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

      this.partnerLocations.push(partnerLocation);
    } catch (error) {
      console.error('Failed to fetch partner location:', error.message);
      throw error;
    }
  }

  async fetchEmployeeById(employeeId: number): Promise<void> {
    const query = queries.EMPLOYEE_QUERY;
    const variables = { employeeId };

    if (this.employees.some((employee) => employee.EmployeeID === employeeId)) {
      return;
    }

    try {
      const response = await this.client.request<interfaces.EmployeeResponse>(
        query,
        variables,
      );
      this.employees.push(response.employee);
    } catch (error) {
      console.error('Failed to fetch employee by ID:', error.message);
      throw error;
    }
  }

  processDateTime(dateTimeString: string): void {
    const dateTime = new Date(dateTimeString);

    // Process Date
    const year = dateTime.getFullYear().toString();
    const calendarQuarter = this.getCalendarQuarter(dateTime).toString();
    const calendarMonth = (dateTime.getMonth() + 1).toString();
    const weekNumber = this.getWeekNumber(dateTime).toString();
    const dayOfWeek = dateTime.getDay().toString();

    const dateID = this.dimDate.length + 1;
    const fullDate = `${year}.${calendarQuarter}`;
    const yearly = year;
    const quarterly = `${year}.${calendarQuarter}`;
    const monthly = `${year}.${calendarMonth}`;
    const weekly = `${year}.${calendarMonth}.${weekNumber}`;
    const daily = `${year}.${calendarMonth}.${dayOfWeek}`;

    const dateData = {
      DateID: dateID,
      FullDate: fullDate,
      Yearly: yearly,
      Quarterly: quarterly,
      Monthly: monthly,
      Weekly: weekly,
      Daily: daily,
    };

    this.dimDate.push(dateData);

    // Process Time
    const hourOfDay = dateTime.getHours().toString();
    const minuteOfHour = dateTime.getMinutes().toString();

    const timeID = this.dimTime.length + 1;
    const fullTime = `${hourOfDay}.${minuteOfHour}`;

    const hourly = hourOfDay;
    const minutely = `${hourOfDay}.${minuteOfHour}`;

    const timeData = {
      TimeID: timeID,
      FullTime: fullTime,
      Hourly: hourly,
      Minutely: minutely,
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
}
