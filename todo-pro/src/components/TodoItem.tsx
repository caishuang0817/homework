import type{Todo}from'../types/todo';
import {Box, Checkbox, HStack, IconButton, Text} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}
export function TodoItem({todo, onToggle, onDelete}: TodoItemProps) {
    return (
        <Box w="100%" py={2} px={4} borderRadius="md" bg={todo.done ? 'gray.100' : 'white'} boxShadow="sm" mb={2}>
            <HStack>
                <Checkbox isChecked={todo.done} onChange={()=>onToggle(todo.id)} colorScheme="teal"/>
                    <Text flex={1} textDecoration={todo.done ? 'line-through' : 'none'}>
                        {todo.text}
                    </Text>
                <IconButton aria-label="删除" icon={<DeleteIcon/>} size="sm" colorScheme="red" variant="ghost" onClick={()=>onDelete(todo.id)}/>
            </HStack>
        </Box>
    )
}