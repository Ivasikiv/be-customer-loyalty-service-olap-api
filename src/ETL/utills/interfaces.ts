export interface AllOrderRecordsResponse {
  orderRecords: Array<{
    LocationID: number;
    LoyaltyCardID: number;
    OrderDateTime: string;
    OrderID: number;
    OrderTypeID: number;
    PaymentMethod: string;
    SellerID: number;
  }>;
}

export interface OrderRecordsResponse {
  getOrderRecordsFromDateRange: Array<{
    LocationID: number;
    LoyaltyCardID: number;
    OrderDateTime: string;
    OrderID: number;
    OrderTypeID: number;
    PaymentMethod: string;
    SellerID: number;
  }>;
}

export interface OrderDetailsByOrderIDResponse {
  orderDetailsByOrderID: Array<{
    AssortmentSegmentID: number;
    ItemName: string;
    OrderDetailID: number;
    OrderID: number;
    Price: number;
    PromoCampaignID?: number;
    Quantity: number;
  }>;
}

export interface AssortmentSegmentResponse {
  assortmentSegment: {
    AssortmentSegmentID: number;
    AssortmentSegmentType: string;
    PartnerLocationID: number;
    Points: number;
  };
}

export interface PromoCampaignResponse {
  promoCampaign: {
    Description: string;
    EndDate: string;
    PartnerID: number;
    PromoCampaignID: number;
    PromoCampaignName: string;
    StartDate: string;
  };
}

export interface LoyaltyCardResponse {
  loyaltyCard: {
    CardNumber: string;
    CurrentBalance: number;
    FirstUsage: string;
    LastUsage: string;
    LoyaltyCardID: number;
    LoyaltyCardTypeID: number;
    LoyaltyUserID: number;
    Status: string;
  };
}

export interface LoyaltyCardTypeResponse {
  loyaltyCardType: {
    Description: string;
    DiscountPercentage: number;
    LoyaltyCardTypeID: number;
    TypeName: string;
  };
}

export interface LoyaltyCardForDimention {
  LoyaltyCardID: number;
  CardType: string;
  DiscountPercentage: number;
  CardNumber: string;
  CurrentBalance: number;
}

export interface LoyaltyUserResponse {
  LoyaltyUser: {
    BirthDate: string;
    FirstName: string;
    LastName: string;
    LoyaltyUserID: number;
  };
}

export interface PartnerResponse {
  partner: { Name: string; PartnerID: number };
}

export interface PartnerLocationRespons {
  partnerLocation: {
    Address: string;
    City: string;
    Country: string;
    LocationID: number;
    LocationName: string;
    PartnerID: number;
    State: string;
    ZipCode: string;
  };
}

export interface DimPartnerLocation {
  LocationID: number;
  PartnerName: string;
  LocationName: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
}

export interface EmployeeResponse {
  employee: {
    EmployeeID: number;
    FirstName: string;
    LastName: string;
    Position: string;
  };
}
