import { UserTableRow } from "./UserTableRow";
import { SubscriptionWithUser } from "../../models/Subscriptions";
import { TableBody } from "../common/Table/TableBody";
import { Table } from "../common/Table";
import {
  TableHead,
  TableHeadRow,
  TableHeadCell,
} from "../common/Table/TableHead";

export const UserSubscriptionsTable = ({
  users,
}: {
  users: SubscriptionWithUser[];
}) => {
  return (
    <div>
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <Table className="min-w-full">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>Handle</TableHeadCell>
                  <TableHeadCell>Provider</TableHeadCell>
                  <TableHeadCell>Role</TableHeadCell>
                  <TableHeadCell>Granularity</TableHeadCell>
                  <TableHeadCell>Upload Credits</TableHeadCell>
                  <TableHeadCell>Download Credits</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <UserTableRow key={user.id} subscriptionWithUser={user} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
