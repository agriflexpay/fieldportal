/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { signIn, useSession } from "next-auth/react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { getPlans } from "../pages/api/plans";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";
import CardCover from "@mui/joy/CardCover";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import CardOverflow from "@mui/joy/CardOverflow/CardOverflow";
const _fetchPlans = async (id: any, authtoken: any) => {
  const response = await getPlans({ id, authtoken });
  return response;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function formatDate(dateString: any) {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

function RowMenu(setOpenApplyModal: {
  (value: React.SetStateAction<boolean>): void;
  (arg0: boolean): void;
},inspectPlan: any) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <VisibilityOutlinedIcon /> View
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem color="primary">
          <Link onClick={() => setOpenApplyModal(true)}>Apply</Link>
        </MenuItem>
        <MenuItem color="success">Book</MenuItem>
        <MenuItem>
        <Link onClick={() => inspectPlan(true)}>Inspect</Link>
        </MenuItem>
        {/* <Divider /> */}
        {/* <MenuItem color="danger">Delete</MenuItem> */}
      </Menu>
    </Dropdown>
  );
}

function ApplyModal(
  openApplyModal: boolean,
  setOpenApplyModal: (arg0: boolean) => void,
  data: any
) 
{
  const layout = "center";
  function handleLayoutChange(event: React.ChangeEvent<HTMLInputElement>) {
    layout === "center" ? "bottom" : "center";
  }
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="close-modal-title"
        open={openApplyModal}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          setOpenApplyModal(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        <Sheet
          variant="soft"
          sx={{
            minWidth: 300,
            borderRadius: "md",
            p: 0,
          }}
        >
          <Card
            sx={{ width: 320 }}
            variant="soft"
            color="primary"
            invertedColors
          >
            <div>
              <Typography level="title-lg">{data?.name}</Typography>
              <Typography level="body-sm">{data?.createdAt}</Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
              >
                <BookmarkAdd />
              </IconButton>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent orientation="horizontal">
              {/* <div>
                <Typography level="body-xs">Total price:</Typography>
                <Typography fontSize="lg"  level="h2" fontWeight="lg">
                  {data?.total_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "Ksh",
                  })}
                </Typography>
              </div> */}
              {/* <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                Explore
              </Button> */}
              <CircularProgress size="lg" determinate value={20}>
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </SvgIcon>
              </CircularProgress>
              <CardContent>
                <Typography level="body-sm" textColor="primary.400">
                  Total price:
                </Typography>
                <Typography fontSize="lg" level="h2" fontWeight="lg">
                  {data?.total_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "Ksh",
                  })}
                </Typography>
              </CardContent>
            </CardContent>
            <CardOverflow variant="soft">
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography level="body-xs">6.3k views</Typography>
                <Divider orientation="vertical" />
                <Button variant="outlined" color="neutral">
                  Inspect
                </Button>
                <Divider orientation="vertical" />
                <Button variant="outlined" color="neutral">
                  Apply
                </Button>
              </CardContent>
            </CardOverflow>
          </Card>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
export default function PlansTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [plans, setPlans] = React.useState([]);
  const { data: session } = useSession();
  const _data: any = session?.user;
  const sessionData: any = session;
  const authtoken = sessionData?.authToken;
  const [openApplyModal, setOpenApplyModal] = React.useState(false);
  const Agency = _data?.user?.Agency;
  const [inspectPlan, setInspectPlan] = React.useState(false);
  const { refetch: data } = useQuery(
    ["fetchPlansByAgency", Agency?.id],
    () => _fetchPlans(Agency?.id, authtoken),
    {
      onSuccess: (data: any) => {
        setPlans(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const rows = plans.map((plan: any) => {
    return {
      id: plan.id,
      name: plan?.KukuPlan?.name,
      duration: plan?.KukuPlan?.duration,
      total_amount: plan?.KukuPlan?.amount,
      interest_rate: `${plan?.KukuPlan?.interest_rate} % p.a`,
      KukuPlan: plan?.KukuPlan,
      Agency: plan?.Agency,
      createdAt: formatDate(plan?.createdAt),
    };
  });

  React.useEffect(() => {
    data();
  }, [Agency?.id]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Name</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by name"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          {/**loop throuh return name */}
          {rows.map((row: any) => {
            return <Option value={row.name}>{row.name}</Option>;
          })}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Duration in months</FormLabel>
        <Select size="sm" placeholder="All">
          {rows.map((row: any) => {
            return <Option value={row.duration}>{row.duration}</Option>;
          })}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Interest rate</FormLabel>
        <Select size="sm" placeholder="All">
          {rows.map((row: any) => {
            return (
              <Option value={row.interest_rate}>{row.interest_rate}</Option>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for plans</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "initial", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Name
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Duration</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Total Amount</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Interest Rate</th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                More Infomation{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, "id")).map((row: any) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row?.duration}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row?.total_amount}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row?.interest_rate}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {/* <Link level="body-xs" component="button">
                      Apply
                    </Link> */}
                    {ApplyModal(openApplyModal, setOpenApplyModal, row)}
                    {RowMenu(setOpenApplyModal, setInspectPlan)}
                    
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
