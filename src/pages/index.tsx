import DefaultLayout from "@/layouts/default";
import { Tabs, Tab, Card, CardBody, Input, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import VenuesMap from "@/components/VenuesMap/VenuesMap";
import VenuesList from "@/components/VenuesList/VenuesList";
import api, { LIMIT } from "@/helpers/api";

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
      const venues = await api.fetchVenues(
        page,
        caption,
        hasToilet,
        hasWashroom
      );

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
            <VenuesList
              data={data}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              limit={LIMIT}
            />
          </Tab>
          <Tab key="map" title="Карта">
            <Card>
              <CardBody>
                <VenuesMap />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </section>
    </DefaultLayout>
  );
}
