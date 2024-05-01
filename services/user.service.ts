import "../src/mongoose/db_mongo";
import "../src/mongoose/models/Activity";
import "../src/mongoose/models/Month";
import User from "../src/mongoose/models/User";
import Activity from "../src/mongoose/models/Activity";
import Month from "../src/mongoose/models/Month";

export async function createUser({
  description,

  name,
  phoneNumber,
}: {
  description?: string;
  name: string;
  phoneNumber?: string;
}) {
  try {
    ////////////////////////////////////

    // Crear el usuario
    const user = new User({
      description,

      name: name.trim().toLowerCase(),
      phoneNumber,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    return user;
    ////////////////////////////////////
  } catch (err) {
    console.error(err);
    return { error: "Error al crear el usuario", err };
  }
}

export async function getUsers() {
  try {
    // Buscar todos los usuarios que pertenecen a una actividad con el nombre específico
    const users = await User.find().populate("months");

    return users;
  } catch (error) {
    console.error(error);
    return { error: "Error al buscar todos los usuarios" };
  }
}
export async function getUsersByActivityId({
  activityIds,
}: {
  activityIds: string[];
}) {
  try {
    // Buscar todos los usuarios que pertenecen a las actividades con los IDs específicos
    const users = await User.find({
      activity: { $in: activityIds }, // Asumo que el campo correcto es "activity._id", ajusta según tu modelo
    }).populate(["months"]);

    return users;
  } catch (error) {
    console.error(error);
    return { error: "Error al buscar usuarios por actividad" };
  }
}

export async function getUser({ id }: any) {
  try {
    const user = await User.findById(id).populate(["months"]);

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Hubo un problema al buscar el usuario");
  }
}

export async function getUserValidate({ name, activity }: any) {
  try {
    // Buscar usuarios con el mismo nombre en la misma actividad

    const existingUsers = await User.find({
      name: name,
    }).populate("activity");

    if (existingUsers.length > 0) {
      // Ya existe un usuario con el mismo nombre en la misma actividad
      return {
        exists: true,
        user: existingUsers, // Puedes devolver el primer usuario encontrado
      };
    } else {
      // No hay usuarios existentes, se puede crear uno nuevo
      return { exists: false };
    }
  } catch (err) {
    console.error(err);
    return { exists: false, error: "Error al validar el usuario" };
  }
}

export async function updateUser({
  userId,
  phoneNumber,
  description,
  name,
}: {
  userId: string;
  phoneNumber?: string;
  description?: string;
  name?: string;
}) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!userId) {
      return { error: "Se requiere un ID de usuario válido" };
    }

    // Crear un objeto con las propiedades actualizadas
    const updatedFields: { [key: string]: any } = {};
    if (phoneNumber) {
      updatedFields.phoneNumber = phoneNumber.trim();
    }
    if (description) {
      updatedFields.description = description.trim();
    }
    if (name) {
      updatedFields.name = name.trim().toLowerCase();
    }

    // Actualizar el usuario con las propiedades proporcionadas
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    // Verificar si el usuario fue encontrado y actualizado
    if (!updatedUser) {
      throw new Error("No se encontro el usuario");
    }

    return updatedUser;
  } catch (err) {
    console.error(err);
    return { error: "Error al actualizar el usuario" };
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    // Buscar al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No se encontro un usuario con esa id");
    }

    // Eliminar al usuario
    await User.findByIdAndDelete(userId);

    return { success: "Usuario eliminado exitosamente" };
  } catch (err) {
    console.error(err);
    throw new Error("Error al eliminar el usuario");
  }
}
