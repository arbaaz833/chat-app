import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

export const Login: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) => state.auth.loginStatus === "loading"
  );
  const navigate = useNavigate();

  const onFinish: FormProps<{
    email: string;
    password: string;
  }>["onFinish"] = async (values) => {
    try {
      await dispatch(
        authActions.login({
          email: values.email,
          password: values.password,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        });
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: "600px" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input email!" },
          { type: "email" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
          type="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <div className="mt-8 text-center">
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            block
            style={{ width: "50%" }}
          >
            Log in
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
