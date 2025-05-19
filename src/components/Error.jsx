function Error ({error}) {
    return (
        <section className="display-error">
            <h1>{error.response.status}</h1>
            <h2>{error.msg}</h2>
        </section>
    )
}

export default Error