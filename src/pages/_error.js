function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `Ein Fehler ${statusCode} ist auf dem Server aufgetreten.`
        : "Ein Fehler ist im Browser aufgetreten."}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
