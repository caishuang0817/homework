# React + TypeScript + Vite
✅ 1. 初始化工程
npm create vite@latest main-project -- --template react-ts
cd main-project
npm install


✅ 2. 安装 Chakra UI（v3.20+）
npm install @chakra-ui/react @emotion/react


✅ 3. 设置 Chakra UI 入口（main.tsx）
  // src/main.tsx
  import React from "react"; // Re-import React for React.StrictMode
  import { createRoot } from "react-dom/client";
  import { ChakraProvider, defaultSystem } from "@chakra-ui/react"; // Re-import ChakraProvider and defaultSystem
  import App from "./App.tsx";

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("rootElement is null");
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {" "}
      {/* Re-added React.StrictMode */}
      <ChakraProvider value={defaultSystem}>
        {" "}
        {/* Re-added ChakraProvider */}
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  );


✅ 4. 准备 Mock 数据（订单）
// src/mock/orders.ts
export const mockOrders = [
  { id: 1, productName: 'iPhone 15', quantity: 2 },
  { id: 2, productName: 'MacBook Pro', quantity: 1 },
  { id: 3, productName: 'iPad Air', quantity: 3 },
  { id: 4, productName: 'AirPods Pro', quantity: 5 },
];

✅ 5. 编写订单过滤组件（OrderFilter.tsx）
// src/components/OrderFilter.tsx
import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onFilter: (keyword: string) => void;
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

✅ 6. 编写订单列表组件（OrderList.tsx）
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

  ✅ 7. 页面主组件 App.tsx
  // src/App.tsx
  import { Container, Heading } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { mockOrders } from "./mock/orders";
  import { OrderFilter } from "./components/OrderFilter";
  import { OrderList } from "./components/OrderList";

  function App() {
    const [orders, setOrders] = useState(mockOrders);
    const [filtered, setFiltered] = useState(mockOrders);

    useEffect(() => {
      // 模拟加载
      setFiltered(mockOrders);
    }, []);

    const handleFilter = (keyword: string) => {
      const kw = keyword.trim().toLowerCase();
      const filtered = orders.filter((o) =>
        o.productName.toLowerCase().includes(kw),
      );
      setFiltered(filtered);
    };

    return (
      <Container maxW="container.md" py={6}>
        <Heading mb={4}>产品订单页面</Heading>
        <OrderFilter onFilter={handleFilter} />
        <OrderList orders={filtered} />
      </Container>
    );
  }

  export default App;


✅ 8. 运行项目
npm run dev
