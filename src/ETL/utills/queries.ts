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

export const POINT_TRANSACTION_QUERY = `
query PointTransactionByOrderID($orderId: Int!) {
  pointTransactionByOrderID(orderID: $orderId) {
    OrderRecordID
    PointTransactionID
    PointTransactionType
    PointsChange
  }
}
`;

// ------------------- MUTATIONS -------------------

export const LOAD_LOCATION_QUERY = `
mutation CreateLocation($createData: DimLocationCreateInput!) {
  createLocation(createData: $createData) {
    Address
    City
    Country
    LocationID
    LocationName
    PartnerName
    State
    ZipCode
  }
}
`;

export const LOAD_LOYALTY_CARD_QUERY = `
mutation CreateLoyaltyCard($createData: DimLoyaltyCardCreateInput!) {
  createLoyaltyCard(createData: $createData) {
    CardBalance
    CardNumber
    CardType
    DiscountPercentage
    LoyaltyCardID
  }
}
`;

export const LOAD_ASSORTMENT_SEGMENT_QUERY = `
mutation CreateAssortmentSegment($createData: DimAssortmentSegmentCreateInput!) {
  createAssortmentSegment(createData: $createData) {
    AssortmentSegmentID
    AssortmentSegmentType
    Points
  }
}
`;

export const LOAD_PROMO_CAMPAIGN_QUERY = `
mutation CreatePromoCampaign($createData: DimPromoCampaignCreateInput!) {
  createPromoCampaign(createData: $createData) {
    Description
    EndDate
    PromoCampaignID
    PromoCampaignName
    StartDate
  }
}
`;

export const LOAD_LOYALTY_USER_QUERY = `
mutation CreateUser($createData: DimLoyaltyUserCreateInput!) {
  createUser(createData: $createData) {
    Age
    FirstName
    LastName
    LoyaltyUserID
  }
}
`;

export const LOAD_SELLER_QUERY = `
mutation CreateSeller($createData: DimSellerCreateInput!) {
  createSeller(createData: $createData) {
    FirstName
    LastName
    SellerID
  }
}
`;

export const LOAD_DIM_DATE_QUERY = `
mutation CreateDimDate($createData: DimDateCreateInput!) {
  createDimDate(createData: $createData) {
    CalendarMonth
    CalendarQuarter
    CalendarYear
    DateID
    DayOfWeek
    FullDate
    WeekNumber
  }
}
`;

export const LOAD_DIM_TIME_QUERY = `
mutation CreateTime($createData: DimTimeCreateInput!) {
  createTime(createData: $createData) {
    AMorPM
    FullTime
    HourOfDay
    MinuteOfHour
    TimeID
  }
}
`;

export const LOAD_ORDER_RECORD_QUERY = `
mutation CreateFactTransactionCheck($data: CreateFactTransactionCheckInput!) {
  createFactTransactionCheck(data: $data) {
    DateID
    LocationID
    LoyaltyCardID
    LoyaltyUserID
    PaymentMethod
    PointsAccumulated
    PointsWithdraw
    SellerID
    TimeFromLastCardUsage
    TimeID
    TotalPrice
    TransactionCheckID
  }
}
`;

export const LOAD_ORDER_DETAIL_QUERY = `
mutation CreateFactTransactionItem($data: CreateFactTransactionItemInput!) {
  createFactTransactionItem(data: $data) {
    AssortmentSegmentID
    DateID
    ItemName
    LocationID
    LoyaltyUserID
    Price
    PromoCampaignID
    QuantitySold
    SellerID
    TimeID
    TotalPoints
    TransactionItemID
  }
}
`;
