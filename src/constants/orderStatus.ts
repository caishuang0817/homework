export enum OrderStatus {
  UNPAY = 0,    // 未支付
  PAID = 1,     // 已支付
  FINISHED = 2  // 已完成
}

export const orderStatusOptions = [
  { value: OrderStatus.UNPAY, label: '未支付' },
  { value: OrderStatus.PAID, label: '已支付' },
  { value: OrderStatus.FINISHED, label: '已完成' }
]; 