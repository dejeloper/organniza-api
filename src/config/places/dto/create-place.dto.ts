import {Place} from "@prisma/client";

export type CreatePlaceDto = Omit<Place, 'id' | 'enabled' | 'createdAt' | 'updatedAt'>;
