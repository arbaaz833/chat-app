import ImagePicker from "@/common/components/imagePicker/imagePicker";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { FormProps } from "antd/lib";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  toggleForm: Function;
}

export const Signup: FC<IProps> = ({ toggleForm }) => {
  const loading = useAppSelector(
    (state) => state.auth.signupStatus === "loading"
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<{
    username: string;
    password: string;
    email: string;
    confirmPassword?: string;
    file: File[];
  }>["onFinish"] = async (values) => {
    try {
      console.log("Signup values:", values);
      if (!values.file) {
        message.error("Please upload a profile picture.");
        return;
      }
      delete values.confirmPassword; // Remove confirm password from the payload
      dispatch(authActions.signup({ ...values, file: values.file[0] }))
        .unwrap()
        .then(() => {
          message.success("Account created successfully. Please login.");
          toggleForm();
        })
        .catch((err) => {
          console.error("Signup error:", err);
          message.error("Failed to create account. Please try again.");
        });
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
      <Form.Item name="file" className="flex justify-center items-center">
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
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input user name." }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="username"
          size="large"
          type="text"
        />
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
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please input your Password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
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
