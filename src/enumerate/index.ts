export enum FilterConnect {
  /**
   *[FilterCode("and")]
   */
  AND,
  /**
   * [FilterCode("or")]
   */
  OR
}

export enum FilterOperator {
  /**
   *[FilterCode("==")][Description("等于")]
   */
  EQUAL,
  /**
   *[FilterCode(">")][Description("大于")]
   */
  GREATERTHAN,
  /**
   *[FilterCode(" >=") ][Description("大于或等于“)]
   */
  GREATERTHANOREQUAL,
  /**
   *[FilterCode("<")][Description("小于“)]
   */
  LESSTHAN,
  /**
   *[FilterCode("<=")][Description("小于或等于")]
   */
  LESSTHANOREQUAL,
  /**
   *[FilterCode(" !=“)][Description("不等于“)]
   */
  NOTEQUAL,
  /**
   *[FilterCode (" Contains")][Description("包含“)]
   */
  IN,
  /**
   *[Fil terCode(" Contains ")][Description("模糊查询“)]
   */
  LIKE
}
