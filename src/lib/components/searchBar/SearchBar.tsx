import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { debounced } from "@/lib/utils/misc.utils";
import { conversationsActions } from "@/modules/conversations/slice/conversations.slice";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FC } from "react";

interface IProps {}

export const SearchBar: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector(
    (state) => state.conversations.showSearchResults
  );

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    console.log("Search input changed:", e.target.value);
    dispatch(conversationsActions.searchConversations(value));
    if (!value && result) {
      dispatch(conversationsActions.setShowResults(false));
    }
    if (value && !result) {
      dispatch(conversationsActions.setShowResults(true));
    }
  };

  const search = debounced(onChange, 500);

  return (
    <div className="h-16 p-2 flex items-center justify-between gap-2">
      <Input
        type="text"
        size="middle"
        prefix={<SearchOutlined />}
        onChange={search}
        allowClear
      />
      <Button type="primary" size="middle" icon={<UserAddOutlined />} />
    </div>
  );
};
