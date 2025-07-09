import React, { useEffect, useState} from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useTodoContext } from "./contexts/TodoContext";

const TodoListScreen = ({navigation}) => {
    const { sampleTodos, setSampleTodos } = useTodoContext();
    const [todoTitle, setTodoTitle] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);

    console.log("sampleTodos", sampleTodos);

    const handleDelete = (id) => {
        setSampleTodos(sampleTodos.filter(todo => todo.id !== id));
    };

    const renderTodoInput = () => {
        return (
            <View style={{ marginVertical: 12 }}>
                <TextInput
                    placeholder="Add notes..."
                    placeholderTextColor="#888"
                    value={todoTitle}
                    onChangeText={setTodoTitle}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#50C878",
                            paddingVertical: 12,
                            paddingHorizontal: 18,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            if (todoTitle.trim()) {
                                setSampleTodos([
                                    ...sampleTodos,
                                    {
                                        id: Date.now(),
                                        title: todoTitle,
                                        completed: false,
                                    },
                                ]);
                                setTodoTitle('');
                            }
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Todo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderEditToDoModal = () => {
        return (
            <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8 }}>
                <TextInput
                    placeholder="Edit todo..."
                    placeholderTextColor="#888"
                    value={todoTitle}
                    onChangeText={setTodoTitle}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#50C878",
                        paddingVertical: 12,
                        paddingHorizontal: 18,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        setSampleTodos(sampleTodos.map(todo =>
                            todo.id === editingTodoId ? { ...todo, title: todoTitle } : todo
                        ));
                        setOpenEditModal(false);
                        setTodoTitle('');
                        setEditingTodoId(null);
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleEdit = (itemId) => {
        const todoToEdit = sampleTodos.find(todo => todo.id === itemId);
        if (todoToEdit) {
            setTodoTitle(todoToEdit.title);
            setEditingTodoId(itemId);
            setOpenEditModal(true);
        }
    }

    const renderTodoItem = ({ item }) => (
        <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            padding: 12, 
            borderBottomWidth: 1, 
            borderColor: '#eee' 
        }}>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{
                    backgroundColor: '#ff5252',
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                style={{
                    backgroundColor: '#8cf50e',
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    marginLeft: 8,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTodayQuote = () => {
        return (
            <View style={{ padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontStyle: 'italic' }}>
                    "Sample quaote"
                </Text>
                <Text style={{ fontSize: 14, color: '#555', marginTop: 4 }}>- Sula</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {openEditModal && renderEditToDoModal()}
            {renderTodoInput()}
            {renderTodayQuote()}
            <FlatList
                data={sampleTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTodoItem}
            />
        </View>
    );
};

export default TodoListScreen;