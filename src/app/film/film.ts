import { Director } from "../director/director";
import { Genre } from "../genre/genre";

export class Film {
    public id: number;
    public title: string;
    public duration: number;
    public releaseDate: string;
    public director: Director;
    public genre: Genre;
}
