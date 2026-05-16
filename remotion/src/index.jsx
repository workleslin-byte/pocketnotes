import { registerRoot, Composition } from 'remotion'
import { NotebookAnimation } from './NotebookAnimation'

export const RemotionRoot = () => (
  <>
    <Composition
      id="NotebookAnimation"
      component={NotebookAnimation}
      durationInFrames={220}
      fps={30}
      width={1080}
      height={1080}
    />
  </>
)

registerRoot(RemotionRoot)
