import VideoEditForm from "./VideoEditForm"

const EditVideoPage = async ({ params }: { params: { id: string } }) => {
  return <VideoEditForm videoId={await params.id} />
}

export default EditVideoPage
