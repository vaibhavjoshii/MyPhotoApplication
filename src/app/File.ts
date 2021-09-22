export class File{
    absolute: boolean;
    //absoluteFile	{}
    absolutePath: string;
    //canonicalFile	{}
    canonicalPath: string;
    directory: boolean;
    file: boolean;
    freeSpace: number;
    hidden:	boolean;
    name: string;
    parent:	string;
    //parentFile	{}
    path: string;
    totalSpace:	number;
    usableSpace: number;
    
    constructor(){
        this.absolute = false;
        this.absolutePath = "";
        this.canonicalPath = "";
        this.directory = false;
        this.file = false;
        this.freeSpace = 0;
        this.hidden =false;
        this.name = "";
        this.parent = "";
        this.path = "";
        this.totalSpace = 0;
        this.usableSpace = 0;
    }
}