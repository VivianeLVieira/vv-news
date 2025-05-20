function Error ({error}) {
    console.error(error)
    return (
        <section className="display-error">
            <h1>{error.response.status}</h1>
            <h2>{error.response.data.msg}</h2>
        </section>
    )
}

export default Error