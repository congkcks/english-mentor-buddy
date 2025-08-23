import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AtSign, LockKeyhole, User, Globe, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/services/supabaseClient'; // Nhập Supabase client

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            agreeTerms: checked,
        }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            toast({
                title: "Thông tin không hợp lệ",
                description: "Vui lòng nhập họ và tên",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast({
                title: "Email không hợp lệ",
                description: "Vui lòng nhập email đúng định dạng",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.username.trim() || formData.username.length < 4) {
            toast({
                title: "Tên đăng nhập không hợp lệ",
                description: "Tên đăng nhập phải có ít nhất 4 ký tự",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.password.trim() || formData.password.length < 6) {
            toast({
                title: "Mật khẩu không hợp lệ",
                description: "Mật khẩu phải có ít nhất 6 ký tự",
                variant: "destructive",
            });
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Mật khẩu không khớp",
                description: "Mật khẩu xác nhận không khớp với mật khẩu",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.agreeTerms) {
            toast({
                title: "Điều khoản sử dụng",
                description: "Vui lòng đồng ý với điều khoản sử dụng",
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    // Hàm cập nhật cơ sở dữ liệu
    const updateDatabase = async () => {
        try {
            const { data, error } = await supabase
                .from('user')
                .insert({
                    tendangnhap: formData.username,
                    email: formData.email,
                    password: formData.password, // Lưu mật khẩu thô vì đây là bài tập
                    englishlevel: 'beginner', // Giá trị mặc định, có thể thay đổi
                    ngaytaotaikhoan: new Date().toISOString(), // Ngày tạo tài khoản
                })
                .select()
                .single();

            if (error) {
                if (error.code === '23505') { // Lỗi trùng khóa duy nhất (email hoặc tendangnhap)
                    throw new Error('Tên đăng nhập hoặc email đã tồn tại');
                }
                throw error;
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Đã xảy ra lỗi khi đăng ký');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Gọi hàm updateDatabase để thêm dữ liệu vào Supabase
            await updateDatabase();

            toast({
                title: "Đăng ký thành công",
                description: "Tài khoản của bạn đã được tạo thành công",
                variant: "default",
            });

            // Chuyển hướng về trang đăng nhập
            navigate('/');

        } catch (error: any) {
            console.error('Registration error:', error);
            toast({
                title: "Đăng ký thất bại",
                description: error.message || "Đã xảy ra lỗi khi đăng ký tài khoản",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 ${theme === 'dark' ? 'dark' : ''}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo and Header */}
                <div className="flex flex-col items-center mb-8">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <Globe className="h-8 w-8 text-primary" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary via-dictionary to-exercises bg-clip-text text-transparent">EngBuddy</span>
                    </Link>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">Đăng ký tài khoản</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        Tạo tài khoản mới để bắt đầu hành trình học tiếng Anh
                    </p>
                </div>

                {/* Registration Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name field */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                                Họ và tên
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    className="pl-10 py-6 rounded-xl text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                Email
                            </Label>
                            <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Nhập địa chỉ email"
                                    className="pl-10 py-6 rounded-xl text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Username field */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                                Tên đăng nhập
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Nhập tên đăng nhập"
                                    className="pl-10 py-6 rounded-xl text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                Mật khẩu
                            </Label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className="pl-10 py-6 rounded-xl text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Confirm Password field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                                Xác nhận mật khẩu
                            </Label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    className="pl-10 py-6 rounded-xl text-base dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-2 py-2">
                            <Checkbox
                                id="agreeTerms"
                                checked={formData.agreeTerms}
                                onCheckedChange={handleCheckboxChange}
                                disabled={isLoading}
                                className="mt-1"
                            />
                            <Label
                                htmlFor="agreeTerms"
                                className="text-sm text-gray-600 dark:text-gray-400"
                            >
                                Tôi đồng ý với <Link to="/terms" className="text-primary hover:underline">Điều khoản sử dụng</Link> và <Link to="/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link>
                            </Label>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full py-6 mt-4 text-lg font-medium bg-primary hover:bg-primary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin mr-2">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    </span>
                                    Đang xử lý...
                                </>
                            ) : 'Đăng ký'}
                        </Button>
                    </form>

                    {/* Login link */}
                    <div className="mt-5 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Đã có tài khoản?{' '}
                            <Link to="/" className="text-primary font-medium hover:underline">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} EngBuddy. All rights reserved.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;