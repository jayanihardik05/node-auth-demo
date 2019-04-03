export class imagepage {
  public name: string;
}

export class UserMaster {
  public CreatedDate: Date;
  public UserId: number;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public MobileNo: number;
  public CountryId: number;
  public Address: string;
  public State: string;
  public City: string;
}

export class ChangePassword {
  public OldPassword: string;
  public NewPassword: string;
  public ConfirmPassword: string;
}

export class StaticPages {
  public Id: number;
  public Name: string;
  public Body: string;
}

export class Setting {
  public Id: number;
  public Tag: string;
  public Value: string;
}

export class EmailTemplate {
  public Id: number;
  public Name: string;
  public Subject: string;
  public Body: string;
}


export class Category {
  public Id: number;
  public Name: string;
}
