import { Property } from "@tsed/schema";

class CeticiUserInfo {
    @Property()
    id: string;
    
    @Property()
    token: string;
}

export default CeticiUserInfo