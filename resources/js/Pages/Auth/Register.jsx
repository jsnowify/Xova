import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout"; // Assuming Breeze's GuestLayout
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nickname: "",
        username: "",
        email: "",
        role: "user", // Default role, ensure it's one of your valid roles
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        // Optional: Reset password fields if there are errors after submission,
        // or simply rely on the onFinish callback.
        // return () => {
        //     reset('password', 'password_confirmation');
        // };
    }, []); // Empty dependency array, runs on mount and unmount

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            // 'register' named route from your Laravel routes
            onFinish: () => reset("password", "password_confirmation"), // Resets password fields after attempt
        });
    };

    // Define your roles for the select dropdown. These should match backend validation.
    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
        // Add other roles as needed (e.g., { value: 'admin', label: 'Administrator' })
    ];

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Nickname Field */}
                <div>
                    <InputLabel htmlFor="nickname" value="Nickname" />
                    <TextInput
                        id="nickname"
                        name="nickname"
                        value={data.nickname}
                        className="mt-1 block w-full"
                        autoComplete="nickname"
                        isFocused={true}
                        onChange={(e) => setData("nickname", e.target.value)}
                        required
                    />
                    <InputError message={errors.nickname} className="mt-2" />
                </div>

                {/* Username Field */}
                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                {/* Email Field */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Role Field (Select Dropdown) */}
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        onChange={(e) => setData("role", e.target.value)}
                        required
                    >
                        {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Password Field */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password Field */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
