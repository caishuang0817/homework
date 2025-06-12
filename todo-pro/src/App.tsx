
import './App.css'
import{FilterBar } from './components/FilterBar';
import{Demo }from './components/Demo'
import { Route, Routes, useNavigate } from 'react-router-dom';
import {Button} from "@chakra-ui/react";
export default function App() {
    const navigate = useNavigate();
    return (
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <Button colorScheme="teal" onClick={() => navigate('/filter-bar')}>游戏商城页面</Button>
                                <Button ml="10px" colorScheme="teal" onClick={() => navigate('/demo')}>订单检索页面</Button>
                            </div>
                        }
                    />
                    <Route path="/filter-bar" element={<FilterBar />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </div>
    );
}