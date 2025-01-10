import DefaultLayout from "@/layouts/default";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
  Tooltip,
  Input,
  Checkbox,
  Spinner,
  Button,
} from "@nextui-org/react";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./index.module.css";
import { DeleteIcon, EditIcon } from "@/components/icons";

const LIMIT = 50;

export const VENUE_TYPE_TEXT = {
  prayer_room: "Молельная",
  mosque: "Мечеть",
};

export const STATUS_TEXT = {
  active: "Активна",
  on_moderation: "На модерации",
  disabled: "Отключена",
};

export interface IVenue {
  id: string;
  userId: string;
  venueType: "prayer_room" | "mosque";
  caption: string;
  comment: string;
  description: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  address: string;
  hasToilet: boolean;
  hasWashroom: boolean;
  openingTime: string;
  closingTime: string;
  status: "active" | "on_moderation" | "disabled";
  createdAt: string;
  meta: {
    approvementsCount: number;
    complaintsCount: number;
  };
  isOpen: boolean;
}

const fetchVenues = async (
  pageNumber: number,
  caption: string,
  hasToilet: boolean,
  hasWashroom: boolean
) => {
  const token = Cookies.get("X-Access-Token");
  const params = {
    limit: LIMIT,
    offset: pageNumber * LIMIT,
    ...(caption && { caption }),
    ...(hasToilet && { "filter[hasToilet]": hasToilet }),
    ...(hasWashroom && { "filter[hasWashroom]": hasWashroom }),
  };
  const { data } = await axios.get<IVenue[]>("/api/venues", {
    headers: { "X-Access-Token": token },
    params: params,
  });

  return data;
};

export default function IndexPage() {
  const [data, setData] = useState<IVenue[]>([]);
  const [page, setPage] = useState<number>(0);
  const [caption, setCaption] = useState<string>("");
  const [hasToilet, setHasToilet] = useState<boolean>(false);
  const [hasWashroom, setHasWashroom] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getVenus = async () => {
      const venues = await fetchVenues(page, caption, hasToilet, hasWashroom);

      setData(venues);
      setIsLoading(false);
    };

    getVenus();
  }, [page, caption, hasToilet, hasWashroom]);

  return (
    <DefaultLayout>
      <section className="flex flex-col">
        <Card className="mb-4">
          <CardBody className="flex flex-row items-center gap-4">
            <Input
              label="Поиск"
              size="sm"
              type="text"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setPage(0);
              }}
              onClear={() => {
                setCaption("");
                setPage(0);
              }}
              isClearable
            />
            <Checkbox
              value="hasToilet"
              isSelected={hasToilet}
              onChange={(e) => {
                setHasToilet(e.target.checked);
                setPage(0);
              }}
            >
              Туалет
            </Checkbox>
            <Checkbox
              value="hasWashroom"
              isSelected={hasWashroom}
              onChange={(e) => {
                setHasWashroom(e.target.checked);
                setPage(0);
              }}
            >
              Душ
            </Checkbox>
          </CardBody>
        </Card>
        <Tabs aria-label="Options">
          <Tab key="list" title="Список">
            <section className="flex flex-col gap-4">
              {isLoading ? (
                <div className={styles.loading}>
                  <Spinner color="default" labelColor="foreground" size="lg" />
                </div>
              ) : (
                <>
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
                      {/* <TableColumn>Координаты</TableColumn> */}
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
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Chip
                              size="sm"
                              color={
                                item.venueType === "prayer_room"
                                  ? "primary"
                                  : "secondary"
                              }
                            >
                              {VENUE_TYPE_TEXT[item.venueType]}
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
                              {STATUS_TEXT[item.status]}
                            </Chip>
                          </TableCell>
                          <TableCell>{item.caption}</TableCell>
                          <TableCell>{item.address}</TableCell>
                          {/* <TableCell>
                        {item.coordinates.lng} {item.coordinates.lat}
                      </TableCell> */}
                          <TableCell>
                            <Chip
                              size="sm"
                              color={item.hasToilet ? "success" : "danger"}
                            >
                              {item.hasToilet ? "да" : "нет"}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="sm"
                              color={item.hasToilet ? "success" : "danger"}
                            >
                              {item.hasWashroom ? "да" : "нет"}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="sm"
                              color={item.hasToilet ? "success" : "danger"}
                            >
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
                                item.meta.approvementsCount > 0
                                  ? "success"
                                  : "default"
                              }
                            >
                              {item.meta.approvementsCount}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="sm"
                              color={
                                item.meta.complaintsCount > 0
                                  ? "danger"
                                  : "default"
                              }
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
                      isDisabled={data.length < LIMIT}
                      onPress={() => setPage(page + 1)}
                    >
                      Вперед
                    </Button>
                  </section>
                </>
              )}
            </section>
          </Tab>
          <Tab key="map" title="Карта">
            <Card>
              <CardBody>MAP</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </section>
    </DefaultLayout>
  );
}
