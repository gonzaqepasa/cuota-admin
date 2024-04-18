import { useState } from "react";
import { typesActivity, typesUser } from "../../../../types/types-user";
import { Pagination } from "@nextui-org/react";

interface Props {
  users: typesUser[];
  activities: typesActivity[];
}

// Función para dividir el array de usuarios en páginas
const paginateUsers = (
  users: typesUser[],
  currentPage: number,
  pageSize: number
) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
};

const Table2: React.FC<Props> = ({ activities, users }) => {
  // Tamaño de la página
  const pageSize = 2; // Puedes ajustar este valor según tus necesidades

  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función para cambiar de página
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Obtener los usuarios de la página actual
  const paginatedUsers = paginateUsers(users, currentPage, pageSize);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {paginatedUsers.map((user: typesUser, index: number) => (
          <li key={index}>{user.name}</li> // Ajusta user.name según la estructura de tus datos de usuario
        ))}
      </ul>
      <Pagination
        total={Math.ceil(users.length / pageSize)}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Table2;
