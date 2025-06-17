// src/components/OrderFilter.tsx
import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { orderStatusOptions, OrderStatus } from '../constants/orderStatus';
import './OrderFilter.css';

interface Props {
	onFilter: (keyword: string, status?: number) => void;
}

export function OrderFilter({ onFilter }: Props) {
	const [input, setInput] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>(undefined);

	return (
		<HStack mb={4}>
			<Input
				placeholder="请输入产品名称"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<select
				className="order-filter-select"
				value={selectedStatus}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value ? Number(e.target.value) : undefined)}
			>
				<option value="">选择订单状态</option>
				{orderStatusOptions.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<Button 
				colorScheme="blue" 
				onClick={() => onFilter(input, selectedStatus)}
			>
				筛选
			</Button>
		</HStack>
	);
}
