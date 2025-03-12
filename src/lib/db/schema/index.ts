import * as users from "./users";
import * as sessions from "./sessions";
import * as posts from "./posts";

export {users} from "./users";
export {sessions} from "./sessions";
export {posts} from "./posts";

const schema = {...users, ...sessions, ...posts};

export default schema;