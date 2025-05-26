基于这个完整的类图，我来提供核心类的抽象描述：

# 旅游管理系统核心类抽象

## 一、产品管理模块

### 1. TourProduct (旅游产品)
**职责**: 管理旅游线路的基本信息和状态
```java
class TourProduct {
    // 核心属性
    String productId;          // 产品唯一标识
    String productName;        // 产品名称
    String destination;        // 目的地
    int duration;             // 行程天数
    String description;       // 产品描述
    ProductStatus status;     // 产品状态(草稿/发布/下架)
    Date createTime;          // 创建时间
    Date updateTime;          // 更新时间
    
    // 核心业务方法
    void addTourSchedule(TourSchedule schedule);     // 添加团期
    void updatePrice(ProductPrice price);            // 更新价格
    void setStatus(ProductStatus status);            // 设置状态
    List<TourSchedule> getTourSchedules();           // 获取团期列表
}
```

### 2. TourSchedule (团期安排)
**职责**: 管理具体的出团时间和容量信息
```java
class TourSchedule {
    String scheduleId;         // 团期标识
    String productId;          // 关联产品
    Date departureDate;        // 出发日期
    Date returnDate;          // 返回日期
    int maxCapacity;          // 最大容量
    int currentBookings;      // 当前预订数
    Date registrationDeadline; // 报名截止日期
    ScheduleStatus status;     // 团期状态
    
    boolean checkAvailability();      // 检查可用性
    boolean addBooking();            // 添加预订
    int getAvailableSeats();         // 获取可用座位数
}
```

### 3. ProductPrice (产品价格)
**职责**: 管理产品价格信息和历史版本
```java
class ProductPrice {
    String priceId;           // 价格标识
    String productId;         // 关联产品
    BigDecimal adultPrice;    // 成人价格
    BigDecimal childPrice;    // 儿童价格
    Date effectiveDate;       // 生效日期
    Date expiryDate;         // 失效日期
    int version;             // 版本号
    
    boolean isEffective(Date date);   // 检查是否有效
    BigDecimal calculateTotalPrice(int adults, int children); // 计算总价
}
```

## 二、申请管理模块

### 4. TourApplication (旅游申请)
**职责**: 系统核心实体，管理整个申请生命周期
```java
class TourApplication {
    String applicationId;      // 申请唯一标识
    String scheduleId;         // 关联团期
    String applicantName;      // 申请人姓名
    String contactPhone;       // 联系电话
    String contactEmail;       // 联系邮箱
    Date applicationDate;      // 申请日期
    ApplicationStatus status;  // 申请状态
    BigDecimal totalAmount;    // 总金额
    BigDecimal depositAmount;  // 订金金额
    BigDecimal balanceAmount;  // 余款金额
    String notes;             // 备注信息
    
    BigDecimal calculateDeposit();              // 计算订金
    BigDecimal calculateBalance();              // 计算余款
    void updateStatus(ApplicationStatus status); // 更新状态
    void addParticipant(Participant participant); // 添加参与者
}
```

### 5. Participant (参与者)
**职责**: 管理申请中的参与人员信息
```java
class Participant {
    String participantId;      // 参与者标识
    String applicationId;      // 关联申请
    String name;              // 姓名
    String idNumber;          // 身份证号
    String phone;             // 电话
    Date birthDate;           // 出生日期
    ParticipantType participantType; // 参与者类型
    
    int getAge();             // 获取年龄
    boolean isChild();        // 是否儿童
}
```

## 三、支付管理模块

### 6. Payment (支付记录)
**职责**: 管理所有支付交易记录
```java
class Payment {
    String paymentId;         // 支付标识
    String applicationId;     // 关联申请
    PaymentType paymentType;  // 支付类型(订金/余款/退款)
    BigDecimal amount;        // 支付金额
    PaymentMethod paymentMethod; // 支付方式
    Date paymentDate;         // 支付日期
    PaymentStatus status;     // 支付状态
    String receiptNo;         // 收据编号
    String operatorId;        // 操作员
    String notes;             // 备注
    
    Receipt generateReceipt();  // 生成收据
    boolean verifyAmount();     // 验证金额
}
```

### 7. Receipt (收据)
**职责**: 管理支付凭证和打印
```java
class Receipt {
    String receiptId;         // 收据标识
    String paymentId;         // 关联支付
    String receiptNo;         // 收据编号
    Date issueDate;          // 开具日期
    BigDecimal amount;        // 金额
    PaymentType paymentType;  // 支付类型
    String customerName;      // 客户姓名
    
    void printReceipt();      // 打印收据
    String generateReceiptNo(); // 生成收据编号
}
```

## 四、催款管理模块

### 8. CollectionTask (催款任务)
**职责**: 管理催款任务和优先级
```java
class CollectionTask {
    String taskId;            // 任务标识
    String applicationId;     // 关联申请
    CollectionType collectionType; // 催款类型
    int overdueDays;         // 逾期天数
    BigDecimal overdueAmount; // 逾期金额
    Priority priority;        // 优先级
    TaskStatus status;        // 任务状态
    Date createDate;         // 创建日期
    Date dueDate;            // 到期日期
    
    Priority calculatePriority(); // 计算优先级
    boolean isOverdue();         // 是否逾期
}
```

### 9. CollectionRecord (催款记录)
**职责**: 记录催款操作和客户反馈
```java
class CollectionRecord {
    String recordId;          // 记录标识
    String taskId;           // 关联任务
    Date contactDate;        // 联系日期
    ContactMethod contactMethod; // 联系方式
    ContactStatus contactStatus; // 联系状态
    String customerFeedback;  // 客户反馈
    Date promisedPaymentDate; // 承诺付款日期
    String operatorId;       // 操作员
    String notes;            // 备注
    
    void markAsSuccessful();  // 标记成功
    void scheduleFollowUp();  // 安排跟进
}
```

## 五、用户权限管理模块

### 10. User (用户)
**职责**: 管理系统用户和权限验证
```java
class User {
    String userId;           // 用户标识
    String username;         // 用户名
    String password;         // 密码
    String realName;         // 真实姓名
    String email;            // 邮箱
    String phone;            // 电话
    UserRole role;           // 用户角色
    UserStatus status;       // 用户状态
    Date createTime;         // 创建时间
    
    boolean login(String password);                    // 登录验证
    boolean hasPermission(Permission permission);      // 权限检查
    void changePassword(String newPassword);           // 修改密码
}
```

### 11. Role (角色)
**职责**: 管理角色和权限分配
```java
class Role {
    String roleId;           // 角色标识
    String roleName;         // 角色名称
    String description;      // 角色描述
    List<Permission> permissions; // 权限列表
    
    void addPermission(Permission permission);    // 添加权限
    void removePermission(Permission permission); // 移除权限
}
```

### 12. Permission (权限)
**职责**: 定义系统权限和访问控制
```java
class Permission {
    String permissionId;     // 权限标识
    String permissionName;   // 权限名称
    String description;      // 权限描述
    String resource;         // 资源
    String action;           // 操作
    
    boolean checkAccess(String resource, String action); // 检查访问权限
}
```

## 六、财务管理模块

### 13. FinancialRecord (财务记录)
**职责**: 统一管理所有财务数据
```java
class FinancialRecord {
    String recordId;         // 记录标识
    String applicationId;    // 关联申请
    RecordType recordType;   // 记录类型
    BigDecimal amount;       // 金额
    Date recordDate;         // 记录日期
    String description;      // 描述
    String operatorId;       // 操作员
    
    ExportData export();     // 导出数据
    boolean validate();      // 验证记录
}
```

### 14. CancellationFee (取消手续费)
**职责**: 处理取消申请的费用计算
```java
class CancellationFee {
    String feeId;            // 费用标识
    String applicationId;    // 关联申请
    Date cancellationDate;   // 取消日期
    BigDecimal totalAmount;  // 总金额
    BigDecimal feeAmount;    // 手续费金额
    BigDecimal refundAmount; // 退款金额
    BigDecimal feeRate;      // 手续费率
    String reason;           // 取消原因
    
    BigDecimal calculateFee(); // 计算手续费
    void processRefund();      // 处理退款
}
```

## 七、规则管理模块

### 15. DepositRule (订金规则)
**职责**: 管理订金计算规则
```java
class DepositRule {
    String ruleId;           // 规则标识
    String productType;      // 产品类型
    int daysBeforeDeparture; // 出发前天数
    BigDecimal depositRate;  // 订金比例
    Date effectiveDate;      // 生效日期
    RuleStatus status;       // 规则状态
    
    BigDecimal calculateDeposit(BigDecimal totalAmount, int daysInterval); // 计算订金
    boolean isApplicable(Date date); // 是否适用
}
```

### 16. BalanceRule (余款规则)
**职责**: 管理余款支付规则
```java
class BalanceRule {
    String ruleId;           // 规则标识
    String productType;      // 产品类型
    int paymentDeadlineDays; // 支付截止天数
    Date effectiveDate;      // 生效日期
    RuleStatus status;       // 规则状态
    
    Date calculatePaymentDeadline(Date departureDate); // 计算支付截止日期
    boolean isApplicable(Date date); // 是否适用
}
```

### 17. CancellationRule (取消规则)
**职责**: 管理取消手续费规则
```java
class CancellationRule {
    String ruleId;           // 规则标识
    String productType;      // 产品类型
    int daysBeforeDeparture; // 出发前天数
    BigDecimal feeRate;      // 手续费率
    Date effectiveDate;      // 生效日期
    RuleStatus status;       // 规则状态
    
    BigDecimal calculateCancellationFee(BigDecimal amount, Date cancelDate, Date departureDate); // 计算取消费用
    boolean isApplicable(Date date); // 是否适用
}
```

## 核心类关系总结

1. **产品管理**: TourProduct → TourSchedule → ProductPrice
2. **申请流程**: TourSchedule → TourApplication → Participant
3. **支付流程**: TourApplication → Payment → Receipt
4. **催款流程**: TourApplication → CollectionTask → CollectionRecord
5. **权限控制**: User → Role → Permission
6. **财务管理**: TourApplication → FinancialRecord/CancellationFee
7. **规则应用**: DepositRule/BalanceRule/CancellationRule → 各业务类

这17个核心类构成了完整的旅游业务管理系统，涵盖了从产品管理到财务结算的全业务流程。