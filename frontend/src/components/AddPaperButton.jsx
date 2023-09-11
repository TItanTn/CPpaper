import { Button } from "@mui/material"
import { Link, useParams } from "react-router-dom"

const AddPaperButton = () => {
    const {Username} = useParams()
    return (
        <div className="add-paper-button">
            <Link to={`/PaperInventory/${Username}/new-paper`}>
                <Button variant="contained">Add Paper</Button>
            </Link>
        </div>
    )
}

export default AddPaperButton