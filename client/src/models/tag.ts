export class Tag {
  constructor(public _id: string, public text: string) {}
}

export class CheckboxTag extends Tag {
  public selected = false;
}
