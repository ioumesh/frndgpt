import React from "react";
import "./login.css";

const Login = ({ login, user, logout, isLogin }) => {
  return (
    <div className="loginView">
      {user && (
        <>
          <p>{user.email}</p>
        </>
      )}

      <>
        {isLogin ? (
          <>
            <button className="signinBtn" onClick={() => login()}>
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            {Object.keys(user).length !== 0 && (
              <button className="signinBtn" onClick={logout}>
                Logout
              </button>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Login;
