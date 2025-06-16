import ImagePicker from "@/common/components/imagePicker/imagePicker";
import { useAppSelector } from "@/lib/redux/store";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import { FC } from "react";

interface IProps {}

export const Signup: FC<IProps> = () => {
  const loading = useAppSelector(
    (state) => state.auth.signupStatus === "loading"
  );
  const onFinish: FormProps<{
    username: string;
    password: string;
    email: string;
    file: File;
  }>["onFinish"] = async (values) => {
    try {
      console.log("Signup values:", values);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: "600px" }}
      onFinish={onFinish}
    >
      <Form.Item name="file" rules={[{ required: true }]}>
        <div className="flex justify-center items-center">
          <ImagePicker
            count={1}
            value={[]}
            imgProps={{
              style: {
                border: "1px solid #99999933",
                objectFit: "cover",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
              },
            }}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input user name." }]}
      >
        <Input placeholder="username" size="large" type="text" />
      </Form.Item>
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

      <Form.Item
        name="confrimPassword"
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
            sign up
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
