export default function Restricted() {
    return (
        <div className="container mx-auto">
            <div className="mt-10 py-2">
                <div className="text-lg">
                    Sorry, this feature is currently only available to internal
                    users
                </div>
                <div className="py-2">
                    We have your email address and will notify you once the
                    feature becomes open to general public
                </div>
            </div>
        </div>
    );
}
