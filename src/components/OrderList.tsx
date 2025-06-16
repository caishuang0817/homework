// src/components/OrderList.tsx
import { Table } from "@chakra-ui/react";

interface Order {
	id: number;
	productName: string;
	quantity: number;
}

export function OrderList({ orders }: { orders: Order[] }) {
	return (
		<Table.Root variant="simple">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>订单ID</Table.ColumnHeader>
					<Table.ColumnHeader>产品名称</Table.ColumnHeader>
					<Table.ColumnHeader>数量</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{orders.map((order) => (
					<Table.Row key={order.id}>
						<Table.Cell>{order.id}</Table.Cell>
						<Table.Cell>{order.productName}</Table.Cell>
						<Table.Cell>{order.quantity}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
