import {
    Button,
    Checkbox,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Input,
    HStack,
    Select,
    Text,
    Center
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import mockData from './mock.json'
import './index.css'

// 定义数据类型
interface Product {
    id: string;
    name: string;
    category: string;
    status: string;
    price: number;
}

// 定义筛选条件类型
interface FilterConditions {
    keyword: string;
    category: string;
    status: string;
}

export function Demo() {
    const [selection, setSelection] = useState<string[]>([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")
    const [tableData, setTableData] = useState<Product[]>(mockData)
    const [filterConditions, setFilterConditions] = useState<FilterConditions>({
        keyword: "",
        category: "",
        status: ""
    })

    // 获取所有唯一的分类和状态
    const categories = Array.from(new Set(mockData.map(item => item.category)))
    const statuses = Array.from(new Set(mockData.map(item => item.status)))

    // 当筛选条件变化时更新表格数据
    useEffect(() => {
        debugger
        let filtered = mockData;

        // 关键词筛选
        if (filterConditions.keyword) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(filterConditions.keyword.toLowerCase()) ||
                item.category.toLowerCase().includes(filterConditions.keyword.toLowerCase()) ||
                item.status.toLowerCase().includes(filterConditions.keyword.toLowerCase())
            );
        }

        // 分类筛选
        if (filterConditions.category) {
            filtered = filtered.filter(item => item.category === filterConditions.category);
        }

        // 状态筛选
        if (filterConditions.status) {
            filtered = filtered.filter(item => item.status === filterConditions.status);
        }

        setTableData(filtered);
    }, [filterConditions]);

    const hasSelection = selection.length > 0
    const indeterminate = hasSelection && selection.length < tableData.length

    const rows = tableData.map((item) => (
        <Tr
            key={item.id}
            data-selected={selection.includes(item.name) ? "" : undefined}
        >
            <Td>
                <Checkbox
                    size="sm"
                    isChecked={selection.includes(item.name)}
                    onChange={(e) => {
                        setSelection((prev) =>
                            e.target.checked
                                ? [...prev, item.name]
                                : selection.filter((name) => name !== item.name),
                        )
                    }}
                />
            </Td>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.category}</Td>
            <Td>{item.status}</Td>
            <Td>￥{item.price.toFixed(2)}</Td>
        </Tr>
    ))

    const handleFilter = () => {
        setFilterConditions({
            keyword: searchKeyword,
            category: selectedCategory,
            status: selectedStatus
        });
    }

    return (
        <Box className="demo-container">
            {/* 搜索框区域 */}
            <HStack spacing={4} className="search-area">
                <Input 
                    variant='outline' 
                    placeholder='名称检索...'
                    flex="1"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Select 
                    placeholder="选择分类"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    width="150px"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </Select>
                <Select 
                    placeholder="选择状态"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    width="150px"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </Select>
                <Button 
                    colorScheme='teal'
                    onClick={handleFilter}
                >
                    检索
                </Button>
            </HStack>
            
            {/* 表格区域 */}
            <Box className="table-container">
                <Table className="table">
                    <Thead className="table-header">
                        <Tr>
                            <Th w="6">
                                <Checkbox
                                    size="sm"
                                    isChecked={selection.length > 0}
                                    isIndeterminate={indeterminate}
                                    onChange={(e) => {
                                        setSelection(
                                            e.target.checked ? tableData.map((item) => item.name) : [],
                                        )
                                    }}
                                />
                            </Th>
                            <Th>ID</Th>
                            <Th>名称</Th>
                            <Th>分类</Th>
                            <Th>订单状态</Th>
                            <Th>价格</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tableData.length > 0 ? (
                            rows
                        ) : (
                            <Tr>
                                <Td colSpan={6}>
                                    <Center className="empty-message">
                                        <Text className="empty-message-text">
                                            没有符合筛选条件的内容！
                                        </Text>
                                    </Center>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    )
}
