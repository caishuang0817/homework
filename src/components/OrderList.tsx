// src/components/OrderList.tsx
import { Table } from "@chakra-ui/react";

interface Order {
	id: number;
	productName: string;
	quantity: number;
	orderStatus: number;
}

export const OrderStatusMap = {
	0: "未支付",
	1: "已支付",
	2: "已完成",
} as const;

export type OrderStatus = keyof typeof OrderStatusMap;

export function OrderList({ orders }: { orders: Order[] }) {
	return (
		<Table.Root variant="outline">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>订单ID</Table.ColumnHeader>
					<Table.ColumnHeader>产品名称</Table.ColumnHeader>
					<Table.ColumnHeader> 订单状态</Table.ColumnHeader>
					<Table.ColumnHeader>数量</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{orders.map((order) => (
					<Table.Row key={order.id}>
						<Table.Cell>{order.id}</Table.Cell>
						<Table.Cell>{order.productName}</Table.Cell>
						<Table.Cell>{OrderStatusMap[order.orderStatus as OrderStatus]}</Table.Cell>
						<Table.Cell>{order.quantity}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
