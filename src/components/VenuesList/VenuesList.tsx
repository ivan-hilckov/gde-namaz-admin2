import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { format } from "date-fns";
import { EditIcon, DeleteIcon } from "@/components/icons";
import { VENUE_TYPE_TEXT, STATUS_TEXT } from "@/constants";
import styles from "./VenuesList.module.css";

interface VenuesListProps {
  isLoading: boolean;
  data: any[];
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export default function VenuesList({
  data,
  isLoading,
  page,
  setPage,
  limit,
}: VenuesListProps) {
  return (
    <section className="flex flex-col gap-4">
      <Table
        isStriped
        isHeaderSticky
        isCompact
        selectionMode="single"
        className={styles.table}
      >
        <TableHeader>
          <TableColumn>Тип</TableColumn>
          <TableColumn>Статус</TableColumn>
          <TableColumn>Подпись</TableColumn>
          <TableColumn>Адрес</TableColumn>
          <TableColumn>Туалет</TableColumn>
          <TableColumn>Душ</TableColumn>
          <TableColumn>Открыто</TableColumn>
          <TableColumn>
            Дата создания <br /> Время работы
          </TableColumn>
          <TableColumn>Одобрений</TableColumn>
          <TableColumn>Жалоб</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={
            <div className={styles.loading}>
              <Spinner color="default" labelColor="foreground" size="lg" />
            </div>
          }
        >
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Chip
                  size="sm"
                  color={
                    item.venueType === "prayer_room" ? "primary" : "secondary"
                  }
                >
                  {
                    VENUE_TYPE_TEXT[
                      item.venueType as keyof typeof VENUE_TYPE_TEXT
                    ]
                  }
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={
                    item.status === "active"
                      ? "success"
                      : item.status === "on_moderation"
                        ? "warning"
                        : "danger"
                  }
                >
                  {STATUS_TEXT[item.status as keyof typeof STATUS_TEXT]}
                </Chip>
              </TableCell>
              <TableCell>{item.caption}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>
                <Chip size="sm" color={item.hasToilet ? "success" : "danger"}>
                  {item.hasToilet ? "да" : "нет"}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip size="sm" color={item.hasToilet ? "success" : "danger"}>
                  {item.hasWashroom ? "да" : "нет"}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip size="sm" color={item.hasToilet ? "success" : "danger"}>
                  {item.isOpen ? "да" : "нет"}
                </Chip>
              </TableCell>
              <TableCell>
                {format(new Date(item.createdAt), "dd.MM.yyyy")}
                <br />
                {item.openingTime} {item.closingTime}
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={
                    item.meta.approvementsCount > 0 ? "success" : "default"
                  }
                >
                  {item.meta.approvementsCount}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={item.meta.complaintsCount > 0 ? "danger" : "default"}
                >
                  {item.meta.complaintsCount}
                </Chip>
              </TableCell>
              <TableCell>
                <section className="flex gap-2">
                  <Tooltip content="Редактировать">
                    <span className="text-lg cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Удалить">
                    <span className="text-lg cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading ? null : (
        <>
          <section className="flex justify-center gap-4">
            <Button
              size="sm"
              color="primary"
              isDisabled={page === 0}
              onPress={() => setPage(page - 1)}
            >
              Назад
            </Button>
            <Button
              size="sm"
              color="primary"
              isDisabled={data.length < limit}
              onPress={() => setPage(page + 1)}
            >
              Вперед
            </Button>
          </section>
        </>
      )}
    </section>
  );
}
