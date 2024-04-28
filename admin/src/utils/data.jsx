import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiFillDelete,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt, BiEdit } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { ImBlog } from "react-icons/im";

export const menuList = [
  {
    key: "",
    icon: <AiOutlineDashboard className="fs-4" />,
    label: "Painel",
  },
  {
    key: "clientes",
    icon: <AiOutlineUser className="fs-4" />,
    label: "Clientes",
  },
  {
    key: "catalogo",
    icon: <AiOutlineShoppingCart className="fs-4" />,
    label: "Catálogo",
    children: [
      {
        key: "produtos",
        icon: <AiOutlineShoppingCart className="fs-4" />,
        label: "Produtos",
      },
      {
        key: "marcas",
        icon: <SiBrandfolder className="fs-4" />,
        label: "Marcas",
      },
      {
        key: "categorias",
        icon: <BiCategoryAlt className="fs-4" />,
        label: "Categorias",
      },
      {
        key: "cores",
        icon: <AiOutlineBgColors className="fs-4" />,
        label: "Cores",
      },
    ],
  },
  {
    key: "pedidos",
    icon: <FaClipboardList className="fs-4" />,
    label: "Pedidos",
  },
  {
    key: "cupons",
    icon: <RiCouponLine className="fs-4" />,
    label: "Cupons",
  },
  {
    // key: "blogs",
    icon: <FaBloggerB className="fs-4" />,
    label: "Blogs",
    children: [
      {
        key: "blogs",
        icon: <FaBloggerB className="fs-4" />,
        label: "Blogs",
      },
      {
        key: "blogs-categorias",
        icon: <ImBlog className="fs-4" />,
        label: "Categorias",
      },
    ],
  },
  {
    key: "entregas",
    icon: <FaClipboardList className="fs-4" />,
    label: "Entregas",
  },
];

const dashboardColumnData = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Fev",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "Abr",
    sales: 145,
  },
  {
    type: "Mai",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 38,
  },
  {
    type: "Jul",
    sales: 38,
  },
  {
    type: "Ago",
    sales: 38,
  },
  {
    type: "Set",
    sales: 38,
  },
  {
    type: "Out",
    sales: 38,
  },
  {
    type: "Nov",
    sales: 38,
  },
  {
    type: "Dez",
    sales: 38,
  },
];
export const  dashboardColumn = {
  data: dashboardColumnData,
  xField: "type",
  yField: "sales",
  color: () => {
    return "#131921";
  },
  label: {
    position: "middle",
    style: {
      fill: "#FFFFFF",
      opacity: 1,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: "Mês",
    },
    sales: {
      alias: "Vendas",
    },
  },
};
export const dashboardTableHeader = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Cliente",
    dataIndex: "name",
  },
  {
    title: "Produto",
    dataIndex: "product",
  },
  {
    title: "Endereço",
    dataIndex: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
export const dashboardTableData = [];
for (let i = 0; i < 46; i++) {
  dashboardTableData.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    address: `São Paulo, SP Centro n. ${i} CEP: 123456-123`,
    status: `Pago ${i}`,
  });
}

export const customerTableHeader = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "WhatsApp",
    dataIndex: "mobile",
  },
  {
    title: "Endereço",
    dataIndex: "address",
  },
];
export const customerTableData = [];
for (let i = 0; i < 30; i++) {
  customerTableData.push({
    key: i,
    name: `John Doe ${i}`,
    email: `johndoe@email ${i}`,
    mobile: `(11) 9 9999-9999 ${i}`,
    address: `São Paulo, SP Centro n. ${i} CEP: 123456-123`,
  });
}

export const colorsTableHeader = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];
export const colorsTableData = [];
for (let i = 0; i < 30; i++) {
  colorsTableData.push({
    key: i,
    name: `Azul`,
    action: (
      <>
        <BiEdit title="Editar" role="button" className="fs-6 text-dark me-3" />
        <AiFillDelete title="Excluir" role="button" className="fs-6 text-danger" />
      </>
    )
  });
}
