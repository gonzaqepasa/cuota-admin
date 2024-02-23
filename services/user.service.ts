import "../src/mongoose/db_mongo";
import "../src/mongoose/models/Activity";
import "../src/mongoose/models/Month";
import User from "../src/mongoose/models/User";
import Activity from "../src/mongoose/models/Activity";

export async function createUser({
  description,
  activityId,
  name,
  phoneNumber,
}: {
  description?: string;
  activityId: string; // ID de la actividad a la que se asociará el usuario
  name: string;
  phoneNumber?: string;
}) {
  try {
    ////////////////////////////////////
    // Verificar si la actividad existe antes de asociar el usuario
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return { error: "La actividad especificada no existe" };
    }

    // Crear el usuario
    const user = new User({
      description,
      activity: activityId, // Asociar el usuario a la actividad
      name,
      phoneNumber,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Asociar el usuario a la actividad
    activity.users.push(user);
    await activity.save();

    return user;
    ////////////////////////////////////
  } catch (err) {
    console.error(err);
    return { error: "Error al crear el usuario" };
  }
}

export async function getUsers({ nameActivity }: { nameActivity: string }) {
  try {
    // Buscar todos los usuarios que pertenecen a una actividad con el nombre específico
    const users = await User.find({
      "activity.nameActivity": nameActivity,
    }).populate("activity");
    console.log(
      "Esta es la respuesta en servicios lo que envia a la ruta",
      nameActivity,
      users
    );

    return users;
  } catch (error) {
    console.error(error);
    return { error: "Error al buscar usuarios por actividad" };
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
    }).populate(["activity", "months"]);

    return users;
  } catch (error) {
    console.error(error);
    return { error: "Error al buscar usuarios por actividad" };
  }
}

export async function getUser({ id }: any) {
  try {
    const user = await User.findById(id).populate(["activity", "months"]);

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
      "activity.nameActivity": activity,
    });

    if (existingUsers.length > 0) {
      // Ya existe un usuario con el mismo nombre en la misma actividad
      return {
        exists: true,
        user: existingUsers[0], // Puedes devolver el primer usuario encontrado
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

export async function changeActivityService({
  userId,
  newActivityId,
}: {
  userId: string;
  newActivityId: string;
}) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!userId || !newActivityId) {
      return { error: "Se requieren ID de usuario y actividad válidos" };
    }

    // Buscar el usuario por ID y obtener la actividad actual
    const user = await User.findById(userId).populate("activity");

    if (!user) {
      return { error: "No se encontró el usuario" };
    }

    const currentActivity = user.activity;

    // Verificar si el usuario ya pertenece a la nueva actividad
    if (currentActivity && currentActivity._id.equals(newActivityId)) {
      return { error: "El usuario ya pertenece a la nueva actividad" };
    }

    // Paso 1: Eliminar al usuario de la actividad actual
    if (currentActivity) {
      currentActivity.users.pull(userId);
      await currentActivity.save();
    }

    // Paso 2: Agregar al usuario a la nueva actividad
    const newActivity = await User.findByIdAndUpdate(
      userId,
      { activity: newActivityId },
      { new: true }
    );

    // Verificar si la nueva actividad fue encontrada y actualizada
    if (!newActivity) {
      return {
        error: "No se encontró la nueva actividad o no se pudo actualizar",
      };
    }

    // Actualizar la lista de usuarios de la nueva actividad
    await User.findByIdAndUpdate(newActivityId, {
      $addToSet: { users: userId },
    });

    return newActivity;
  } catch (err) {
    console.error(err);
    return { error: "Error al cambiar la actividad del usuario" };
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    // Buscar al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No se encontro un usuario con esa id");
    }

    // Obtener el ID de la actividad actual del usuario
    const currentActivityId = user.activity;

    // Si el usuario está asociado a una actividad, quitarlo de la lista de usuarios de esa actividad
    if (currentActivityId) {
      await User.updateOne(
        { _id: userId },
        { $unset: { activity: 1 } } // Eliminar la referencia a la actividad actual
      );

      await Activity.updateOne(
        { _id: currentActivityId },
        { $pull: { users: userId } } // Quitar al usuario de la lista de usuarios de la actividad
      );
    }

    // Eliminar al usuario
    await User.findByIdAndDelete(userId);

    return { success: "Usuario eliminado exitosamente" };
  } catch (err) {
    console.error(err);
    throw new Error("Error al eliminar el usuario");
  }
}
