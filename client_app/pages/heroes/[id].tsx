import DetailView from '../../components/DetailView';
import { useRouter } from 'next/router'

export default function detail() {
    const router = useRouter()
    const { id } = router.query

    return (
        <DetailView class="hero" oid={id} />
    )
}