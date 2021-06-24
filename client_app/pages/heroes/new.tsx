import NewView from '../../components/NewView';
import { useRouter } from 'next/router'

export default function newHero() {
    const router = useRouter()
    return (
        <NewView class="hero"  />
    )
}