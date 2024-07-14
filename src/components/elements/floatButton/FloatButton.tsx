import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"

export const FloatBtn = (): JSX.Element => {
    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
        >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
    )
}