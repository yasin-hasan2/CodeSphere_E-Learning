import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "../features/authSlice";

import { authApi } from "@/features/api/authApi";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/CourseProgressApi";

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (defaultMiddleware) => {
//     defaultMiddleware().concat(authApi.middleware);
//   },
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});

const initializeApp = async () => {
  // You can dispatch any actions here if needed
  await store.dispatch(authApi.endpoints.loadUser.initiate());
};

initializeApp();
