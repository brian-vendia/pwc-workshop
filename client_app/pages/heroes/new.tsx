import DetailView from '../../components/DetailView';
import { useRouter } from 'next/router'

export default function newHero() {
    const router = useRouter()
    return (
        <DetailView class="hero"  />
    )
}