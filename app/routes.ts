import { type RouteConfig, index,route } from "@react-router/dev/routes";
import {resumes} from "../constants";

export default [index("routes/home.tsx"),
    route('/auth','routes/auth.tsx'),
    route('/upload','routes/upload.tsx'),
    route('/resume/:id','routes/resume.tsx'),
    route('/wipe','routes/wipe.tsx'),
] satisfies RouteConfig;

