export const ORDER_RECORDS_QUERY = `
  query OrderRecords {
    orderRecords {
      LocationID
      LoyaltyCardID
      OrderDateTime
      OrderID
      OrderTypeID
      PaymentMethod
      SellerID
    }
  }
`;

export const ORDER_RECORDS_DATE_RANGE_QUERY = `
  query GetOrderRecordsFromDateRange($endDate: String!, $startDate: String!) {
    getOrderRecordsFromDateRange(endDate: $endDate, startDate: $startDate) {
      LocationID
      LoyaltyCardID
      OrderDateTime
      OrderID
      OrderTypeID
      PaymentMethod
      SellerID
    }
  }
`;

export const ORDER_DETAILS_BY_ORDER_ID_QUERY = `
  query OrderDetailsByOrderID($orderId: Int!) {
    orderDetailsByOrderID(orderID: $orderId) {
      AssortmentSegmentID
      ItemName
      OrderDetailID
      OrderID
      Price
      PromoCampaignID
      Quantity
    }
  }
`;

export const ASSORTMENT_SEGMENT_QUERY = `
  query AssortmentSegment($assortmentSegmentId: Int!) {
    assortmentSegment(id: $assortmentSegmentId) {
      AssortmentSegmentID
      AssortmentSegmentType
      PartnerLocationID
      Points
    }
  }
`;

export const PROMO_CAMPAIGN_QUERY = `
  query PromoCampaign($promoCampaignId: Int!) {
    promoCampaign(id: $promoCampaignId) {
      Description
      EndDate
      PartnerID
      PromoCampaignID
      PromoCampaignName
      StartDate
    }
  }
`;

export const LOYALTY_CARD_QUERY = `
  query LoyaltyCard($loyaltyCardId: Int!) {
    loyaltyCard(id: $loyaltyCardId) {
      CardNumber
      CurrentBalance
      FirstUsage
      LastUsage
      LoyaltyCardID
      LoyaltyCardTypeID
      LoyaltyUserID
      Status
    }
  }
`;

export const LOYALTY_CARD_TYPE_QUERY = `
  query LoyaltyCardType($loyaltyCardTypeId: Int!) {
    loyaltyCardType(id: $loyaltyCardTypeId) {
      Description
      DiscountPercentage
      LoyaltyCardTypeID
      TypeName
    }
  }
`;

export const LOYALTY_USER_QUERY = `
  query LoyaltyCardType($loyaltyUserId: Int!) {
    LoyaltyUser(id: $loyaltyUserId) {
      BirthDate
      FirstName
      LastName
      LoyaltyUserID
    }
  }
`;

export const PARTNER_QUERY = `
  query Partner($partnerId: Int!) {
    partner(id: $partnerId) {
      Name
      PartnerID
    }
  }
`;

export const PARTNER_LOCATION_QUERY = `
  query PartnerLocation($partnerLocationId: Int!) {
    partnerLocation(id: $partnerLocationId) {
      Address
      City
      Country
      LocationID
      LocationName
      PartnerID
      State
      ZipCode
    }
  }
`;

export const EMPLOYEE_QUERY = `
  query Employee($employeeId: Int!) {
    employee(id: $employeeId) {
      FirstName
      LastName
      Position
      EmployeeID
    }
  }
`;
