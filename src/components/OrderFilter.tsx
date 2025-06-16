// src/components/OrderFilter.tsx
import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
	onFilter: (keyword: string) => void;
	zhangqinghua: string;
}

export function OrderFilter({ onFilter }: Props) {
	const [input, setInput] = useState("");

	return (
		<HStack mb={4}>
			<Input
				placeholder="请输入产品名称"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<Button colorScheme="blue" onClick={() => onFilter(input)}>
				筛选
			</Button>
		</HStack>
	);
}
