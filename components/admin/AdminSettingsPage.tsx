import React, { useState } from 'react';
import { changeAdminPassword } from '../../services/api.ts';
import Spinner from '../Spinner.tsx';
import Alert from '../Alert.tsx';

const AdminSettingsPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords do not match." });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: "New password must be at least 6 characters long." });
            return;
        }

        setIsLoading(true);
        const { success, message: apiMessage } = await changeAdminPassword(currentPassword, newPassword);
        setIsLoading(false);

        if (success) {
            setMessage({ type: 'success', text: apiMessage });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage({ type: 'error', text: apiMessage });
        }
    };

    return (
        React.createElement("div", null,
            React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-6" }, "Settings"),
            React.createElement("div", { className: "max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" },
                React.createElement("h2", { className: "text-2xl font-bold text-gray-700 mb-6" }, "Change Admin Password"),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "currentPassword" },
                            "Current Password"
                        ),
                        React.createElement("input",
                            {
                                id: "currentPassword",
                                type: "password",
                                value: currentPassword,
                                onChange: (e) => setCurrentPassword(e.target.value),
                                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                required: true
                            }
                        )
                    ),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "newPassword" },
                            "New Password"
                        ),
                        React.createElement("input",
                            {
                                id: "newPassword",
                                type: "password",
                                value: newPassword,
                                onChange: (e) => setNewPassword(e.target.value),
                                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                required: true
                            }
                        )
                    ),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "confirmPassword" },
                            "Confirm New Password"
                        ),
                        React.createElement("input",
                            {
                                id: "confirmPassword",
                                type: "password",
                                value: confirmPassword,
                                onChange: (e) => setConfirmPassword(e.target.value),
                                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                required: true
                            }
                        )
                    ),
                    message && React.createElement(Alert, { type: message.type, message: message.text }),
                    React.createElement("div", { className: "pt-2" },
                        React.createElement("button",
                            {
                                type: "submit",
                                disabled: isLoading,
                                className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300 flex justify-center items-center"
                            },
                            isLoading ? React.createElement(Spinner, null) : 'Update Password'
                        )
                    )
                )
            )
        )
    );
};

export default AdminSettingsPage;